import classNames from 'classnames';
import React from 'react';
import { LeaderboardUser } from '../../contracts/leaderboardUser';

import './leaderboard.scss';

export interface IProps {
    title: string;
    rankings: Array<LeaderboardUser>;
    numberOfUsersOnLeaderboard: number
    showLeaderboard?: boolean;
}

export const Leaderboard: React.FC<IProps> = (props: IProps) => {
    let rankings: Array<LeaderboardUser> = [];
    if (props.rankings && props.rankings.length > 0) {
        rankings = props.rankings
            .sort((a, b) => b.score - a.score)
            .slice(0, props.numberOfUsersOnLeaderboard);
    }

    if (rankings.length < 1) {
        console.warn('No Leaderboard users!');
        return (<div className="leaderboard"></div>);
    }

    return (
        <div className={classNames('leaderboard', { show: props.showLeaderboard ?? false })}>
            <h1>
                <img
                    src="/assets/img/cup.svg"
                    draggable="false"
                    alt="cup"
                    style={{ verticalAlign: 'middle', marginRight: '0.5em' }}
                />
                {props.title}
            </h1>
            <ol>
                {
                    rankings.map((item: LeaderboardUser) => {
                        return (
                            <li key={item.id}>
                                <mark>{item.name}</mark>
                                <small>{item.score}</small>
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
}
