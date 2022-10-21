import React from 'react';

import { ISelectedEmoteMeta, StreamEmoteContainer } from '../../components/streamEmotes/streamEmoteContainer';
import { dependencyInjectionToProps, IExpectedServices } from './videoOverlay.dependencyInjection';

import { SmallLoading } from '../../components/loading';
import { StreamAvailableEmotes } from '../../constants/emote/streamEmotes';
import { EmoteButton } from '../../constants/emote/emoteButton';
import { withServices } from '../../integration/dependencyInjection';
import { addMilliseconds } from '../../helper/dateHelper';

declare global {
    interface Window {
        Twitch: any
    }
}

interface IWithoutExpectedServices {
    wrapperClass: string;
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface IState {
    selectedEmote: EmoteButton;
    receivedEmotes: Array<ISelectedEmoteMeta>;
    emotesHistory: Array<ISelectedEmoteMeta>;

    // Twitch
    twitch: any
    finishedLoading: boolean,
    isVisible: boolean,
}

export class VideoOverlayUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedEmote: EmoteButton.none,
            receivedEmotes: [],
            emotesHistory: [],
            //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
            twitch: window.Twitch ? window.Twitch.ext : null,
            finishedLoading: false,
            isVisible: true
        };
    }

    componentDidMount() {
        this.props.emoteClient.listenToEmote(this.receiveSelectedEmote);

        if (this.state.twitch) {
            this.state.twitch.onAuthorized((auth: any) => {
                this.props.twitchAuthService.setToken(auth.token, auth.userId)
                if (!this.state.finishedLoading) {
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(() => {
                        return { finishedLoading: true }
                    })
                }
            })

            this.state.twitch.listen('broadcast', (target: any, contentType: any, body: any) => {
                this.state.twitch.rig?.log?.(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                // now that you've got a listener, do something with the result... 

                // do something...

            })

            this.state.twitch.onVisibilityChanged((isVisible: any, _c: any) => {
                this.visibilityChanged(isVisible)
            })

            this.state.twitch.onContext((context: any, delta: any) => {
                console.log(context, delta);
                //this.contextUpdate(context, delta)
            })
        }
    }

    componentWillUnmount() {
        this.props.emoteClient.removeListenToEmote(this.receiveSelectedEmote);
        if (this.state.twitch) {
            this.state.twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
        }
    }

    visibilityChanged(isVisible: boolean) {
        this.setState(() => {
            return {
                isVisible
            }
        })
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
    }

    render() {
        if (this.state.finishedLoading && this.state.isVisible) {
            return (<SmallLoading />);
        }

        const availableEmotes = StreamAvailableEmotes.sort((a, b) => a.sortOrder - b.sortOrder);
        return (
            <section id="emote" className={`wrapper ${this.props.wrapperClass}`}>
                <div className="inner">
                    <header className="">
                        <h2>Stream emotes 🎉</h2>
                        <p>From here you can interact with the stream by click these emotes:</p>
                    </header>
                    <StreamEmoteContainer
                        receivedEmotes={this.state.receivedEmotes}
                        availableEmotes={availableEmotes}
                        setCurrentEmote={this.setCurrentEmote}
                        onShowLeaderboardClick={() => { }}
                        emoteClient={this.props.emoteClient}
                    />
                </div>
            </section>
        );
    }
}

export const VideoOverlayPage = withServices<IWithoutExpectedServices, IExpectedServices>(
    VideoOverlayUnconnected,
    dependencyInjectionToProps
);
