import * as apiEndpoints from '../../constants/enum/apiEndpoints';
import { StreamEmoteViewModel } from '../../contracts/generated/ViewModel/Emote/streamEmoteViewModel';
import { Result } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';

export class StreamService extends BaseApiService {

    async emoteWithCaptcha(searchObj: StreamEmoteViewModel): Promise<Result> {
        return await this.post(apiEndpoints.streamEmoteWithCaptcha, searchObj);
    }

    async emoteWithLogin(searchObj: StreamEmoteViewModel): Promise<Result> {
        return await this.post(apiEndpoints.streamEmoteWhileLoggedIn, searchObj);
    }

}
