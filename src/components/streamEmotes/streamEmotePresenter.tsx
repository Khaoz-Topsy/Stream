import { Button, ButtonGroup } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { EmoteTag } from '../../constants/emote/emoteTags';
import { EmoteButton } from '../../constants/emote/emoteButton';
import { IStreamEmoteButton } from '../../contracts/streamEmoteButton';
import { StreamEmoteButton } from './streamEmoteButton';

export interface ISelectedEmoteMeta {
    selectedEmote: EmoteButton;
    expiryDate: Date;
}

interface IProps {
    receivedEmotes: Array<ISelectedEmoteMeta>;
    availableEmotes: Array<IStreamEmoteButton>;
    setCurrentEmote: (newSelectedEmote: EmoteButton) => void;

    selectedSectionIndex: number;
    onSectionClick: (newSelectedSectionIndex: number) => void;

    onShowLeaderboardClick: () => void;
}

export const StreamEmotePresenter: React.FC<IProps> = (props: IProps) => {

    const buttonArray = [
        {
            title: 'Default',
            image: '/assets/img/emotes/facepalm.png',
            tagContains: [EmoteTag.default],
        },
        {
            title: 'No Man\'s Sky',
            image: '/assets/img/emotes/nms/classS.png',
            tagContains: [EmoteTag.nms],
        },
        {
            title: 'Eddison',
            image: '/assets/img/emotes/eddisonSir.png',
            tagContains: [EmoteTag.eddison],
        },
        {
            title: 'Other',
            image: '/assets/img/emotes/kittyGun.png',
            tagContains: [EmoteTag.satisfactory, EmoteTag.other],
        }
    ];

    const tagContains = buttonArray[props.selectedSectionIndex]?.tagContains ?? [];
    const availableEmotes = (props.availableEmotes || []).filter(ae => ae.tags.some(t => tagContains.indexOf(t) >= 0))

    return (
        <div className="row">
            <div className="group-selection ta-center">
                <ButtonGroup className="lg" color="primary" aria-label="outlined primary button group">
                    {
                        buttonArray.map((button: any, index: number) => {
                            return (
                                <Button
                                    key={button.title}
                                    className={classNames({ 'active': index === props.selectedSectionIndex })}
                                    onClick={() => props.onSectionClick?.(index)}
                                >{button.title}</Button>
                            )
                        })
                    }
                </ButtonGroup>
                <ButtonGroup className="sm" color="primary" aria-label="outlined primary button group">
                    {
                        buttonArray.map((button: any, index: number) => {
                            return (
                                <Button
                                    key={button.title}
                                    className={classNames({ 'active': index === props.selectedSectionIndex })}
                                    onClick={() => props.onSectionClick?.(index)}
                                ><img src={button.image} className="sm-img" alt={button.title} /></Button>
                            )
                        })
                    }
                </ButtonGroup>
                <ButtonGroup className="xs" color="primary" aria-label="outlined primary button group">
                    {
                        buttonArray.map((button: any, index: number) => {
                            return (
                                <Button
                                    key={button.title}
                                    className={classNames({ 'active': index === props.selectedSectionIndex })}
                                    onClick={() => props.onSectionClick?.(index)}
                                ><img src={button.image} className="xs-img" alt={button.title} /></Button>
                            )
                        })
                    }
                </ButtonGroup>
            </div>
            <div style={{ width: '100%' }} className="ta-center">
                <div className="flex flex-tabs">
                    <div className="tab tab-1 emote-flex flex flex-5 active" style={{ width: '100%' }}>
                        {
                            availableEmotes.map((item: IStreamEmoteButton, index: number) => {
                                return (
                                    <StreamEmoteButton
                                        key={`${index}-${item.id}`}
                                        {...item}
                                        isActive={props.receivedEmotes.findIndex(re => {
                                            if (re.expiryDate < new Date()) return false;
                                            return re.selectedEmote === item.id;
                                        }) >= 0}
                                        onClick={props.setCurrentEmote}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <button className="button big alt" onClick={props.onShowLeaderboardClick}>
                    <img
                        src="/assets/img/cup.svg"
                        draggable="false"
                        alt="cup"
                        style={{ verticalAlign: 'middle', marginRight: '0.5em', height: '30px' }}
                    />
                    <span>Show Leaderboard on stream</span>
                </button>
            </div>
        </div>
    );
}