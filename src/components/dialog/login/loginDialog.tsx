import React from 'react'
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { CustomGoogleLoginButton } from '../../common/socialBtn/googleButton';
import { OAuthUserViewModel } from '../../../contracts/generated/ViewModel/oAuthUserViewModel';
import { OAuthProviderType } from '../../../contracts/generated/Enum/oAuthProviderType';
import { mapStateToProps, mapDispatchToProps } from './loginDialog.redux';
import { ILoginProps } from '../../../contracts/login';
import { BasicDialog } from '../baseDialog';

import { withServices } from '../../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './loginDialog.dependencyInjection';

interface IState {
    isModalOpen: boolean;
}

interface IWithoutExpectedServices {
    isLoading?: boolean;
    children?: React.ReactNode;
    hideWhenLoggedIn?: boolean;
    hideWhenNotLoggedIn?: boolean;
    colour?: "grey" | "red" | "orange" | "yellow" | "olive" | "green" | "teal" | "blue" | "violet" | "purple" | "pink" | "brown" | "black";

    userGuid?: string;
    userProfileUrl?: string;
    userName?: string;

    setLoadingStatus?: (isLoading: boolean) => void;
    login?: (loginData: ILoginProps) => void;
    logout?: () => void;
}

interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export class LoginDialogUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isModalOpen: false,
        };
    }

    toggleModalOpen = () => {
        this.setState((prevState: IState) => {
            return {
                isModalOpen: !prevState.isModalOpen
            }
        });
    }

    responseGoogle = (type: OAuthProviderType) => async (response: any) => {
        if (response == null ||
            response.tokenId == null ||
            response.profileObj == null ||
            response.accessToken == null ||
            response.profileObj.email == null ||
            response.profileObj.imageUrl == null ||
            response.profileObj.name == null) {
            this.oAuthLoginFailure({ custom: 'manual failure, response did not have expected values' });
            return;
        }
        this.toggleModalOpen();
        var apiObj: OAuthUserViewModel = {
            accessToken: response.accessToken,
            tokenId: response.tokenId,
            email: response.profileObj.email,
            oAuthType: type,
            profileUrl: response.profileObj.imageUrl,
            username: response.profileObj.name,
        }

        var loginResult = await this.props.loginService.loginWithOAuth(apiObj);
        this.setLoadingStatus(false);
        if (loginResult.isSuccess && this.props.login) {
            this.props.login(loginResult.value);
        }
    }

    setLoadingStatus = (isLoading: boolean) => {
        if (this.props.setLoadingStatus) this.props.setLoadingStatus(isLoading);
    }

    oAuthLoginFailure = (error: any) => {
        console.warn(error);
        this.setLoadingStatus(false);
        this.setState(() => {
            return {
                isModalOpen: false
            }
        });
        Swal.fire({
            title: 'Login error!',
            text: `Something went wrong and we could not log you in. ${error.details}`,
            icon: 'error',
        });
    }

    oAuthLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: `Are you sure that you want to logout?`,
            icon: 'question',
            allowEnterKey: true,
            allowEscapeKey: true,
            showCancelButton: true,
        }).then((answer: any) => {
            if (answer.isConfirmed) {
                if (this.props.logout) this.props.logout();
            }
        });
    }

    render() {
        const isLoggedIn = (this.props.userGuid != null && this.props.userGuid.length > 5);
        if (isLoggedIn && this.props.hideWhenLoggedIn) return (<span></span>);
        if (!isLoggedIn && this.props.hideWhenNotLoggedIn) return (<span></span>);

        const LoginComponent = isLoggedIn
            ? (
                <span className="nav-link pointer" onClick={this.oAuthLogout}>
                    <img className="oauth-circle" src={this.props.userProfileUrl} alt={this.props.userName} />
                </span>
            )
            : (
                this.props.children != null
                    ? <div className="pointer" onClick={this.toggleModalOpen}>
                        {this.props.children}
                    </div>
                    : <span className="nav-link pointer" onClick={this.toggleModalOpen}>Login</span>
            )

        return (
            <BasicDialog
                icon={LoginComponent}
                isOpen={this.state.isModalOpen}
                onOpen={this.toggleModalOpen}
                onClose={this.toggleModalOpen}
            >
                <>
                    <h3 className="m-0">AssistantApps Login</h3>
                    <hr className="mt-1" />
                    <GoogleLogin
                        clientId={window.config.googleClientId}
                        render={renderProps => (
                            <CustomGoogleLoginButton
                                disabled={renderProps.disabled ?? false}
                                onClick={() => {
                                    this.setLoadingStatus(true);
                                    renderProps.onClick();
                                }}
                            />
                        )}
                        buttonText="Login"
                        onSuccess={this.responseGoogle(OAuthProviderType.google)}
                        onFailure={this.oAuthLoginFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </>
            </BasicDialog>
        );
    }
}

export const LoginDialog = withServices<IWithoutExpectedServices, IExpectedServices>(
    connect(mapStateToProps, mapDispatchToProps)(LoginDialogUnconnected),
    dependencyInjectionToProps
);