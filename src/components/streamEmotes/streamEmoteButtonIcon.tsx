import React from 'react';
import { BasicImage } from '../../components/core/image';
import { StreamAvailableEmotes } from '../../constants/emote/streamEmotes';
import { EmoteButton } from '../../constants/emote/emoteButton';

import './streamEmoteButton.scss';

export interface IProps {
    emoteId: EmoteButton;
    message?: string;
}

export const StreamEmoteButtonIcon: React.FC<IProps> = (props: IProps) => {
    const emote = StreamAvailableEmotes.find(ae => ae.id === props.emoteId)
    if (emote == null) {
        return <span></span>
    }

    return (
        <>
            <BasicImage
                classNames="tiny-img"
                {...emote}
            />
            {
                props.message != null &&
                <span>&nbsp;&nbsp;{props.message}</span>
            }
        </>
    );
}