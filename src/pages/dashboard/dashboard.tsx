import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../components/core/image';
import { Leaderboard } from '../../components/leaderboard/leaderboard';
import { MajorAnimationDurationTypes, MinorAnimationDurationTypes } from '../../constants/emote/animationDurationTypes';
import { MajorAnimationTypes, MajorAnimationVariationTypes } from '../../constants/emote/majorAnimationTypes';
import { MinorAnimationTypes } from '../../constants/emote/minorAnimationTypes';
import { StreamAvailableEmotes, StreamAvailableEmotesForDash } from '../../constants/emote/streamEmotes';
import { emoteDurationInSeconds, numberOfUsersOnLeaderboard, secondsBetweenLeaderboardDisplay, secondsLeaderboardDisplaysFor } from '../../constants/emote/emoteConstraints';
import { EmoteButton } from '../../constants/emote/emoteButton';
import { StreamEmoteFromUserViewModel } from '../../contracts/generated/ViewModel/Emote/streamEmoteFromUserViewModel';
import { IStreamEmoteButton } from '../../contracts/streamEmoteButton';
import { LeaderboardUser } from '../../contracts/leaderboardUser';

import { addSeconds } from '../../helper/dateHelper';
import { getNewDieInstance, riggedRoll } from '../../helper/randomHelper';

import { withServices } from '../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './dashboard.dependencyInjection';
import moment from 'moment';

interface IWithoutExpectedServices {
    wrapperClass: string;
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

interface ISelectedEmoteMeta {
    selectedEmote: EmoteButton;

    // Major
    majorAnimClass: string;
    majorAnimDurClass: string;
    majorAnimVariantClass: string;

    // Minor
    minorAnimClass: string;
    minorAnimDurClass: string;

    expiryDate: Date;
}

interface IState {
    intervalId?: NodeJS.Timeout;
    selectedEmotes: Array<ISelectedEmoteMeta>;

    showLeaderboard: boolean;
    showLeaderboardDate: Date;
    leaderboardUsers: Array<LeaderboardUser>;

    randomEmoteDice: any;

    majorAnimationDice: any;
    majorAnimationDurationDice: any;
    majorAnimationVariationDice: any;

    minorAnimationDice: any;
    minorAnimationDurationDice: any;
}

export class DashboardPageUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            intervalId: undefined,
            selectedEmotes: [],

            showLeaderboard: true,
            showLeaderboardDate: new Date(),
            leaderboardUsers: [],

            randomEmoteDice: getNewDieInstance(StreamAvailableEmotesForDash.length),

            majorAnimationDice: getNewDieInstance(MajorAnimationTypes.length),
            majorAnimationDurationDice: getNewDieInstance(MajorAnimationDurationTypes.length),
            majorAnimationVariationDice: getNewDieInstance(MajorAnimationVariationTypes.length),

            minorAnimationDice: getNewDieInstance(MinorAnimationTypes.length),
            minorAnimationDurationDice: getNewDieInstance(MinorAnimationDurationTypes.length),
        };
    }

    componentDidMount() {
        this.props.emoteClient.listenToEmote(this.setSelectedEmote);
        this.props.emoteClient.listenToShowLeaderboard(this.userSubmittedShowLeaderboard);

        var intervalId = setInterval(this.timer, 5000);
        this.setState(() => ({ intervalId }));
    }

    componentWillUnmount() {
        this.props.emoteClient.removeListenToEmote(this.setSelectedEmote);
        this.props.emoteClient.removeListenShowLeaderboard(this.userSubmittedShowLeaderboard);
        if (this.state.intervalId) clearInterval(this.state.intervalId);
    }

    timer = () => {
        const validEmotes = this.getValidEmotes(this.state);
        const leaderboardDetailsFunc = (prevState: IState) => {
            const showLeaderboardDate = this.getLeaderboardDate(prevState);
            return {
                showLeaderboard: moment(showLeaderboardDate).isBefore(moment()),
                showLeaderboardDate: showLeaderboardDate,
            }
        }

        if (validEmotes.length > 0) {
            this.setState((prevState: IState) => {
                return leaderboardDetailsFunc(prevState)
            });
        }
        else {
            const randomEmote = riggedRoll<IStreamEmoteButton>(this.state.randomEmoteDice, StreamAvailableEmotesForDash);
            const newStateManipulate = this.manipulateStateOnSelectedEmote({ emoteId: randomEmote.id } as any);

            this.setState((prevState: IState) => {
                const newState = newStateManipulate(prevState);
                return {
                    ...newState,
                    ...leaderboardDetailsFunc(prevState),
                }
            });
        }
    }

    addToLeaderboard = (prevState: IState, newEmoteViewModel: StreamEmoteFromUserViewModel): Array<LeaderboardUser> => {
        let newLeaderboard = [...prevState.leaderboardUsers];
        if (newEmoteViewModel.userId == null) return newLeaderboard;

        const currentUserIndex = newLeaderboard.findIndex(l => l.id === newEmoteViewModel.userId)
        if (currentUserIndex < 0) { // Add user
            newLeaderboard.push({
                id: newEmoteViewModel.userId,
                name: newEmoteViewModel.username,
                score: 1,
            })
            return newLeaderboard;
        }

        const currentUser = { ...newLeaderboard[currentUserIndex] };
        currentUser.score += 1;

        return [
            ...newLeaderboard.slice(0, currentUserIndex),
            currentUser,
            ...newLeaderboard.slice(currentUserIndex + 1)
        ];
    }

    getLeaderboardDate = (prevState: IState): Date => {
        const futureDate = moment(prevState.showLeaderboardDate).add(secondsLeaderboardDisplaysFor, 'seconds');
        const currentDate = moment();

        if (futureDate.isBefore(currentDate)) {
            return currentDate.add(secondsBetweenLeaderboardDisplay, 'seconds').toDate();
        }
        return prevState.showLeaderboardDate;
    }

    userSubmittedShowLeaderboard = () => {
        this.setState(() => {
            return {
                showLeaderboard: true,
                showLeaderboardDate: moment().toDate(),
            }
        });
    }

    getValidEmotes = (state: IState) => {
        return state.selectedEmotes.filter((item: ISelectedEmoteMeta) => {
            return item.expiryDate > new Date();
        })
    }

    setSelectedEmote = (newEmoteViewModel: StreamEmoteFromUserViewModel) => {
        this.setState(this.manipulateStateOnSelectedEmote(newEmoteViewModel));
    }

    manipulateStateOnSelectedEmote = (newEmoteViewModel: StreamEmoteFromUserViewModel) => (prevState: IState) => {
        const majorAnimClass = riggedRoll<string>(this.state.majorAnimationDice, MajorAnimationTypes);
        const majorAnimDurClass = riggedRoll<string>(this.state.majorAnimationDurationDice, MajorAnimationDurationTypes);
        const majorAnimVariantClass = riggedRoll<string>(this.state.majorAnimationVariationDice, MajorAnimationVariationTypes);

        const minorAnimClass = riggedRoll<string>(this.state.minorAnimationDice, MinorAnimationTypes);
        const minorAnimDurClass = riggedRoll<string>(this.state.minorAnimationDurationDice, MinorAnimationDurationTypes);

        const newEmoteObj = {
            selectedEmote: newEmoteViewModel.emoteId,

            majorAnimClass,
            majorAnimDurClass,
            majorAnimVariantClass,

            minorAnimClass,
            minorAnimDurClass,

            expiryDate: addSeconds(new Date(), emoteDurationInSeconds),
        };
        const validSelectedEmotes = this.getValidEmotes(prevState);

        return {
            selectedEmotes: [...validSelectedEmotes, newEmoteObj],
            leaderboardUsers: this.addToLeaderboard(prevState, newEmoteViewModel),
        }
    }

    renderEmote = (emote: ISelectedEmoteMeta): ReactNode => {
        const emoteObj = StreamAvailableEmotes.find((sae: IStreamEmoteButton) => sae.id === emote.selectedEmote);
        if (emoteObj == null) return null;

        const keyBase = `emote: ${emote.selectedEmote}, date: ${emote.expiryDate.toISOString()}`;
        const {
            majorAnimClass, majorAnimDurClass, majorAnimVariantClass,
            minorAnimDurClass, minorAnimClass
        } = emote;
        return (
            <div key={keyBase} data-key={keyBase} className={classNames(majorAnimClass, majorAnimDurClass, majorAnimVariantClass)} draggable={false}>
                <div className={classNames(minorAnimClass, minorAnimDurClass)} draggable={false}>
                    <BasicImage
                        classNames="dashboard-emote"
                        imageUrl={emoteObj.imageUrl}
                        imageName={emoteObj.imageName}
                    />
                </div>
            </div>
        );
    }

    render() {
        const validSelectedEmotes = this.getValidEmotes(this.state);
        const { showLeaderboard, leaderboardUsers } = this.state;
        console.warn({ showLeaderboard })

        return (
            <div id="main" className="height-100vh" draggable={false}>
                <Leaderboard
                    key={leaderboardUsers.length}
                    title="Top 5 emoji clickers - Stream"
                    showLeaderboard={showLeaderboard}
                    rankings={leaderboardUsers}
                    numberOfUsersOnLeaderboard={numberOfUsersOnLeaderboard}
                />
                {
                    validSelectedEmotes.map(this.renderEmote).filter(node => node != null)
                }
            </div>
        );
    }
}


export const DashboardPage = withServices<IWithoutExpectedServices, IExpectedServices>(
    DashboardPageUnconnected,
    dependencyInjectionToProps
);

