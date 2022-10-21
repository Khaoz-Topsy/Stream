import React from 'react';
import { site } from '../../constants/site';
import { BasicLink } from '../core/link';

import packageJson from '../../../package.json';

interface IProps {

}

export const Footer: React.FC<IProps> = () => {
    return (
        <footer id="footer" className="hide-on-stream">
            <div className="inner">
                <div className="flex flex-3">
                    <div className="col">
                        <h3>{site.kurt.nickName}</h3>
                        <ul className="alt">
                            <li><BasicLink href={site.stream.twitch}>Twitch channel</BasicLink></li>
                            <li><BasicLink href={site.kurt.twitter}>Twitter Profile</BasicLink></li>
                            <li><BasicLink href={site.kurt.github}>Github Profile</BasicLink></li>
                            <li><BasicLink href={site.kurt.website}>CV Website</BasicLink></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>{site.assistantApps.name}</h3>
                        <ul className="alt">
                            <li><BasicLink href={site.assistantApps.website}>Main Website</BasicLink></li>
                            <li><BasicLink href={site.assistantApps.tools}>Tools Website</BasicLink></li>
                            <li><BasicLink href={site.assistantApps.discord}>Discord</BasicLink></li>
                            <li><BasicLink href={site.assistantApps.github}>Github Organisation</BasicLink></li>
                            <li><BasicLink href={site.assistantApps.email}>Support Email</BasicLink></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>Other</h3>
                        <ul className="alt">
                            <li><BasicLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Don't click this</BasicLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <ul className="icons">
                    <li><a href="https://google.com" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="https://google.com" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                    <li><a href="https://google.com" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                    <li><a href="https://google.com" className="icon fa-snapchat"><span className="label">Snapchat</span></a></li>
                </ul>
                <BasicLink href={site.kurt.website}>&copy; {site.kurt.fullName} | {packageJson?.version ?? '1.0.0'}</BasicLink>
            </div>
        </footer>
    );
}