import React from 'react';
import { EmoteButton } from '../../constants/emote/emoteButton';
import { IStreamEmoteButton } from '../../contracts/streamEmoteButton';
import { EmoteClient } from '../../services/common/signal/EmoteClient';
import { ISelectedEmoteMeta, StreamEmotePresenter } from './streamEmotePresenter';

export type { ISelectedEmoteMeta } from './streamEmotePresenter';

interface IProps {
    emoteClient: EmoteClient;
    receivedEmotes: Array<ISelectedEmoteMeta>;
    availableEmotes: Array<IStreamEmoteButton>;
    setCurrentEmote: (newSelectedEmote: EmoteButton) => void;
    onShowLeaderboardClick: () => void;
}

interface IState {
    selectedSectionIndex: number;
}

export class StreamEmoteContainer extends React.Component<IProps, IState> {
    captchaRef = React.createRef<any>();
    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedSectionIndex: 0,
        };
    }

    onSectionClick = (newSelectedSectionIndex: number) => {
        this.setState(() => {
            return {
                selectedSectionIndex: newSelectedSectionIndex,
            }
        })
    }

    render() {
        return (
            <StreamEmotePresenter
                {...this.state}
                {...this.props}
                onSectionClick={this.onSectionClick}
                onShowLeaderboardClick={this.props.onShowLeaderboardClick}
            />
        );
    }
}