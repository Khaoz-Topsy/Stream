import React from 'react';
import { connect } from 'react-redux';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { site } from '../../constants/site';
import { numberOfSameEmotePerMinuteAllowed } from '../../constants/emote/emoteConstraints';
import { StreamAvailableEmotes } from '../../constants/emote/streamEmotes';
import { EmoteButton } from '../../constants/emote/emoteButton';
import { withServices } from '../../integration/dependencyInjection';
import { LoginDialog } from '../dialog/login/loginDialog';
import { addMilliseconds, addMinutes } from '../../helper/dateHelper';

import { errorEmoteNotSubmitted, successEmoteSubmitted, warningRateLimitFromServer, warningSpamShowLeaderboard, warningSpamSingleEmoji } from './streamEmoteComponents';
import { ISelectedEmoteMeta, StreamEmoteContainer } from './streamEmoteContainer';
import { mapDispatchToProps, mapStateToProps } from './streamEmote.Redux';
import { dependencyInjectionToProps, IExpectedServices } from './streamEmote.dependencyInjection';

interface IWithoutExpectedServices {
    wrapperClass: string;
}

interface IFromRedux {
    userGuid: string;
    userProfileUrl: string;
    userName: string;
}

interface IProps extends IExpectedServices, IWithoutExpectedServices, IFromRedux { }

interface IState {
    selectedEmote: EmoteButton;
    receivedEmotes: Array<ISelectedEmoteMeta>;
    emotesHistory: Array<ISelectedEmoteMeta>;
    showLeaderboardHistory: Array<Date>;
}

export class StreamEmoteUnconnected extends React.Component<IProps, IState> {
    captchaRef = React.createRef<any>();
    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedEmote: EmoteButton.none,
            receivedEmotes: [],
            emotesHistory: [],
            showLeaderboardHistory: [],
        };
    }

    isLoggedIn = (localProps: IProps) => (localProps.userGuid != null && localProps.userGuid.length > 5);

    componentDidMount() {
        this.props.emoteClient.listenToEmote(this.receiveSelectedEmote);
    }

    componentWillUnmount() {
        this.props.emoteClient.removeListenToEmote(this.receiveSelectedEmote);
    }

    getValidEmotes = (emotesList: Array<ISelectedEmoteMeta>): Array<ISelectedEmoteMeta> => {
        return emotesList.filter((item: ISelectedEmoteMeta) => {
            return item.expiryDate > new Date();
        })
    }

    receiveSelectedEmote = (newEmote: EmoteButton) => {
        this.setState((prevState: IState) => {
            const newItem: ISelectedEmoteMeta = {
                selectedEmote: newEmote,
                expiryDate: addMilliseconds(new Date(), 500),
            }
            const validEmotes = this.getValidEmotes(prevState.receivedEmotes)
            return {
                receivedEmotes: [...validEmotes, newItem]
            }
        });

        setTimeout(() => {
            this.setState((prevState: IState) => {
                return {
                    receivedEmotes: this.getValidEmotes(prevState.receivedEmotes)
                }
            })
        }, 500);
    }

    setCurrentEmote = async (newSelectedEmote: EmoteButton) => {
        const validHistory = this.getValidEmotes(this.state.emotesHistory);
        if (validHistory.filter(vh => vh.selectedEmote === newSelectedEmote).length > numberOfSameEmotePerMinuteAllowed) {
            warningSpamSingleEmoji()
            return;
        }

        this.setState(() => {
            return {
                selectedEmote: newSelectedEmote,
            }
        });

        if (!this.isLoggedIn(this.props)) {
            (this.captchaRef?.current as any)?.execute();
            return;
        }

        var submitEmoteResult = await this.props.streamService.emoteWithLogin({
            emote: newSelectedEmote,
            captcha: '',
        });
        if (submitEmoteResult.isSuccess) {
            successEmoteSubmitted(this.props.toastService, newSelectedEmote);
            this.setState((prevState: IState) => {
                return {
                    emotesHistory: [...prevState.emotesHistory, {
                        selectedEmote: newSelectedEmote,
                        expiryDate: addMinutes(new Date(), 1),
                    }],
                }
            });
            return;
        }

        if (submitEmoteResult.statusCode === 429) {
            warningRateLimitFromServer();
            return;
        }

        errorEmoteNotSubmitted(this.props.toastService, newSelectedEmote);
    }

    onShowLeaderboardClick = () => {
        const validShowHistory = this.state.showLeaderboardHistory.filter((item: Date) => {
            return item > new Date();
        });

        if (validShowHistory.length > 1) {
            warningSpamShowLeaderboard()
            return;
        }

        this.setState((prevState: IState) => {
            return {
                showLeaderboardHistory: [...prevState.showLeaderboardHistory, addMinutes(new Date(), 1),]
            }
        }, this.props.emoteClient.sendShowLeaderboard);
    }

    render() {
        const availableEmotes = StreamAvailableEmotes.sort((a, b) => a.sortOrder - b.sortOrder);
        const isLoggedIn = (this.props.userGuid != null && this.props.userGuid.length > 5);
        return (
            <section id="emote" className={`wrapper ${this.props.wrapperClass}`}>
                <div className="inner">
                    <header>
                        <h2>Stream emotes 🎉</h2>
                        <p>
                            From here you can interact with the stream by clicking these emotes:
                            {
                                !isLoggedIn &&
                                <>
                                    <br />Login to skip completing the captcha on every
                                </>
                            }
                        </p>
                    </header>
                    <StreamEmoteContainer
                        receivedEmotes={this.state.receivedEmotes}
                        availableEmotes={availableEmotes}
                        setCurrentEmote={this.setCurrentEmote}
                        onShowLeaderboardClick={this.onShowLeaderboardClick}
                        emoteClient={this.props.emoteClient}
                    />
                    <HCaptcha
                        ref={this.captchaRef}
                        sitekey={site.captchaKey}
                        theme="dark"
                        size="invisible"
                        onVerify={(token: string) => {
                            const { selectedEmote } = this.state;
                            this.props.streamService.emoteWithCaptcha({
                                emote: selectedEmote,
                                captcha: token,
                            });
                            (this.captchaRef?.current as any)?.resetCaptcha();
                        }}
                    />
                    <span id="login-top-right" className="pos-top-right ta-center">
                        <LoginDialog hideWhenLoggedIn={true}>
                            <i className="icon-user font-2"></i><br />
                            <span>Login</span>
                        </LoginDialog>
                    </span>
                </div>
            </section>
        );
    }
}

export const StreamEmote = withServices<IWithoutExpectedServices, IExpectedServices>(
    connect(mapStateToProps, mapDispatchToProps)(StreamEmoteUnconnected),
    dependencyInjectionToProps
);
