import React from 'react';
import { site } from '../../constants/site';
import { BasicLink } from '../core/link';
import { LoginDialog } from '../dialog/login/loginDialog';

interface IProps {
    toggleDrawer: () => void;
}

export const Header: React.FC<IProps> = (props: IProps) => {
    return (
        <header id="header" className="hide-on-stream">
            <h1>
                <p>Stream Tools&nbsp;
                    <span>for <BasicLink href={site.stream.twitch}>{site.kurt.nickName}</BasicLink></span>
                </p>
            </h1>
            <div className="menu-item">
                <LoginDialog>
                    <i className="icon-user">&nbsp;</i><span>Login</span>
                </LoginDialog>
            </div>
            <div className="menu-item pointer" onClick={props.toggleDrawer}>
                <i className="icon-menu">&nbsp;</i><span>Menu</span>
            </div>
        </header>
    );
}