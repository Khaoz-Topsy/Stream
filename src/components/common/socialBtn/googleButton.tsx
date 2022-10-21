import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";

interface IProps {
    disabled: boolean;
    onClick: () => void;
}

export const CustomGoogleLoginButton = (props: IProps) => {
    const styleObj = {
        opacity: props.disabled ? '50%' : null,
    };
    return (
        <GoogleLoginButton
            className="social-button"
            style={styleObj}
            onClick={props.onClick}
        />
    );
}