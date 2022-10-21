
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { StreamService } from '../../services/api/StreamService';
import { EmoteClient } from '../../services/common/signal/EmoteClient';
import { ToastService } from '../../services/common/toast/toastService';
import { TwitchAuthenticationService } from '../../services/twitch/TwitchAuthenticationService';

export interface IExpectedServices {
    emoteClient: EmoteClient;
    twitchAuthService: TwitchAuthenticationService;
    streamService: StreamService;
    toastService: ToastService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { emoteClient, twitchAuthService, streamService, toastService, } = services;
    return {
        emoteClient,
        twitchAuthService,
        streamService,
        toastService,
    }
};