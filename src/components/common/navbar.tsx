import classNames from 'classnames';
import React from 'react';
import { site } from '../../constants/site';
import { BasicLink } from '../core/link';
import { LoginDialog } from '../dialog/login/loginDialog';

interface IProps {
    showDrawer: boolean;
    toggleDrawer: () => void;
}

export const Navbar: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            {
                props.showDrawer && (
                    <div className="full-page-loader opacity80" onClick={props.toggleDrawer}></div>
                )
            }
            <nav id="menu" className={classNames('hide-on-stream', { visible: props.showDrawer })}>
                <ul className="links">
                    <li className="ta-center"><LoginDialog hideWhenNotLoggedIn={true} /></li>
                    <li><BasicLink href={site.stream.twitch}>Twitch Channel</BasicLink></li>
                    <li><BasicLink href={site.assistantApps.website}>{site.assistantApps.name} Website</BasicLink></li>
                    <li><BasicLink href={site.kurt.github}>Github</BasicLink></li>
                    <li><BasicLink href={site.assistantApps.patreon}>Patreon</BasicLink></li>
                    <li><BasicLink href={site.assistantApps.discord}>Discord</BasicLink></li>
                    <li><BasicLink href={site.kurt.website}>{site.kurt.fullName}</BasicLink></li>
                </ul>
                <span className="close icon-close" onClick={props.toggleDrawer}></span>
            </nav>
        </>
    );
}