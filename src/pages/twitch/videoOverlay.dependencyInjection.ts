
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { StreamService } from '../../services/api/StreamService';
import { EmoteClient } from '../../services/common/signal/EmoteClient';
import { TwitchAuthenticationService } from '../../services/twitch/TwitchAuthenticationService';

export interface IExpectedServices {
    emoteClient: EmoteClient;
    streamService: StreamService;
    twitchAuthService: TwitchAuthenticationService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { emoteClient, twitchAuthService, streamService, } = services;
    return {
        emoteClient,
        twitchAuthService,
        streamService,
    }
};