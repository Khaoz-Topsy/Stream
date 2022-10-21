import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { BasicLink } from './core/link';

interface IVideoColumnItem {
    image: string;
    text: string;
    link?: string;
    onClick?: () => void;
}

interface IProps {
    wrapperClass: string;
    title: string;
    subtitleComponent: ReactNode;
    flexClass?: string;
    items: Array<IVideoColumnItem>;
}

export const VideoColumnSection: React.FC<IProps> = (props: IProps) => {
    return (
        <section className={`wrapper ${props.wrapperClass}`}>
            <div className="inner">
                <header className="align-center">
                    <h2>{props.title}</h2>
                    {props.subtitleComponent}
                </header>

                <div className={classNames('flex', props.flexClass ?? 'flex-2')}>
                    {
                        props.items.map((item: IVideoColumnItem) => {
                            const content = (
                                <>
                                    <div className="image fit">
                                        <img src={item.image} alt={item.text} />
                                    </div>
                                    <p className="caption">{item.text}</p>
                                </>
                            );
                            if (item.link != null) {
                                return (
                                    <BasicLink key={item.image} href={item.link} additionalClassNames="video col">
                                        {content}
                                    </BasicLink>
                                );
                            }
                            return (
                                <div key={item.image} className="video col pointer" onClick={() => item.onClick?.()}>
                                    {content}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}
