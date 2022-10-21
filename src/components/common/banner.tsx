import React, { useEffect, useRef } from 'react';
import { site } from '../../constants/site';
import { BasicLink } from '../core/link';
import { ScrollDownArrowsIndicator } from './scroll/scrollDownIndicator';

interface IProps {
    videoUrl: string;
}

export const Banner: React.FC<IProps> = (props: IProps) => {
    const videoRef: any = useRef<HTMLVideoElement>();
    const previousUrl = useRef<string>();

    useEffect(() => {
        if (previousUrl.current !== props.videoUrl && videoRef.current) {
            setTimeout(() => {
                console.log('load video');
                (videoRef?.current as any).load();
                previousUrl.current = props.videoUrl;
            }, 1000);
        }
    }, [props.videoUrl]);
    return (
        <section id="banner" className="margin-top-navbar" data-video={props.videoUrl}>
            <div className="inner">
                <header>
                    <h1>Stream Tools!</h1>
                    <p>
                        This website is a collection of tools for <BasicLink href={site.stream.twitch}>KhaozTopsy</BasicLink> streams<br />
                        <i>More tools coming soon!</i>&nbsp;🤪
                    </p>
                </header>
                <a href="#emote" className="button big alt scrolly" draggable={false}>Try Emotes 🎉</a>
            </div>
            <video ref={videoRef} autoPlay muted loop>
                <source src={`${props.videoUrl}.mp4`} type="video/mp4" />
                <source src={`${props.videoUrl}.webm`} type="video/webm" />
            </video>
            <ScrollDownArrowsIndicator />
        </section>
    );
}