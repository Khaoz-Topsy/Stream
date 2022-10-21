
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { EmoteClient } from '../../services/common/signal/EmoteClient';

export interface IExpectedServices {
    emoteClient: EmoteClient;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        emoteClient: services.emoteClient,
    }
};