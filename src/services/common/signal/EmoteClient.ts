import { EmoteButton } from '../../../constants/emote/emoteButton';
import { SignalRSendEvent, SignalRReceiveEvent } from '../../../constants/enum/signalREvent';
import { SubmitEmote } from '../../../contracts/generated/Hub/submitEmote';
import { StreamEmoteFromUserViewModel } from '../../../contracts/generated/ViewModel/Emote/streamEmoteFromUserViewModel';
import { BaseClient } from './BaseClient';

export class EmoteClient extends BaseClient {
    listenToEmote = (callBack: (id: StreamEmoteFromUserViewModel | any) => void) => {
        this.addListener(SignalRReceiveEvent.Emote, callBack);
    }

    removeListenToEmote = (callBack: (id: StreamEmoteFromUserViewModel | any) => void) => {
        this.removeListener(SignalRReceiveEvent.Emote, callBack);
    }

    sendEmote = (emoteId: EmoteButton) => {
        this.sendPayload<SubmitEmote>(SignalRSendEvent.SubmitEmote, {
            emote: emoteId,
            captcha: '',
        });
    }

    listenToShowLeaderboard = (callBack: (id: any) => void) => {
        this.addListener(SignalRReceiveEvent.ShowLeaderboard, callBack);
    }

    removeListenShowLeaderboard = (callBack: (id: any) => void) => {
        this.removeListener(SignalRReceiveEvent.ShowLeaderboard, callBack);
    }

    sendShowLeaderboard = () => this.sendPayload(SignalRSendEvent.ShowLeaderboard);
}
