import React from "react";
import { anyObject } from "../helper/typescriptHacks";
import { LoginService } from "../services/api/LoginService";
import { StreamService } from "../services/api/StreamService";
import { EmoteClient } from "../services/common/signal/EmoteClient";
import { ToastService } from "../services/common/toast/toastService";
import { TwitchAuthenticationService } from "../services/twitch/TwitchAuthenticationService";

export interface IDependencyInjection {
    loginService: LoginService;
    emoteClient: EmoteClient;
    twitchAuthService: TwitchAuthenticationService;

    // Common
    streamService: StreamService;
    toastService: ToastService;
}

type GetServices = () => IDependencyInjection;
export const defaultDependencyInjectionFunc: GetServices = () => {
    return {
        loginService: new LoginService(),
        emoteClient: new EmoteClient(),
        twitchAuthService: new TwitchAuthenticationService(anyObject),

        // Common
        streamService: new StreamService(),
        toastService: new ToastService(),
    }
}

export const DependencyInjectionContext = React.createContext<IDependencyInjection>(anyObject);

export const DependencyInjectionProvider: React.FC = ({ children }) => {
    return (
        <DependencyInjectionContext.Provider value={defaultDependencyInjectionFunc()}>
            {children}
        </DependencyInjectionContext.Provider>
    );
};

export function withDependencyInjectionProvider<TProps>(WrappedComponent: any): (React.FC<TProps>) {
    return (props: TProps) => (
        <DependencyInjectionContext.Provider value={defaultDependencyInjectionFunc()}>
            <WrappedComponent {...props} />
        </DependencyInjectionContext.Provider>
    );
};

export function withServices<WithoutExpectedServicesType, ExpectedServicesType>(WrappedComponent: any, mapper: (services: IDependencyInjection) => ExpectedServicesType) {
    const wrapper: React.FC<WithoutExpectedServicesType> = (props: WithoutExpectedServicesType) => {
        return (
            <DependencyInjectionContext.Consumer>
                {
                    (services: IDependencyInjection) =>
                        <WrappedComponent {...(mapper(services))} {...props} />
                }
            </DependencyInjectionContext.Consumer>
        );
    }
    return wrapper;
}