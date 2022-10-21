
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { LoginService } from '../../../services/api/LoginService';


export interface IExpectedServices {
    loginService: LoginService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { loginService, } = services;
    return {
        loginService,
    }
};