import React from 'react';
import classNames from 'classnames';
import { BasicImage } from '../../components/core/image';
import { EmoteButton } from '../../constants/emote/emoteButton';
import { IStreamEmoteButton } from '../../contracts/streamEmoteButton';

import './streamEmoteButton.scss';

export interface IProps extends IStreamEmoteButton {
    isActive: boolean;
    onClick: (id: EmoteButton) => void;
}

export const StreamEmoteButton: React.FC<IProps> = (props: IProps) => {
    return (
        <div className={classNames('video col pointer noselect', { active: props.isActive })}
            onClick={() => props.onClick(props.id)}
        >
            <div className="image fit emote noselect">
                <BasicImage {...props} />
            </div>
        </div>
    );
}