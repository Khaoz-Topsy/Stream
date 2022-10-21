import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { SignalRSendEvent, SignalRReceiveEvent } from '../../../constants/enum/signalREvent';

declare global {
    interface Window { config: any }
}

export class BaseClient {
    private _baseUrl: String = window.config.apiUrl;
    private _connection: HubConnection;

    constructor(newBaseUrl?: String) {
        if (newBaseUrl != null) this._baseUrl = newBaseUrl;
        this._connection = new HubConnectionBuilder()
            .withUrl(this._baseUrl + '/hubs/stream')
            .withAutomaticReconnect()
            .build();
        this._connection.start().then(() => this.logMessage('signalR connection'));
    }

    isConnected = (): boolean => {
        return this._connection.state === HubConnectionState.Connected;
    }

    protected addListener = (channel: SignalRReceiveEvent, callBack: (args: any[]) => void) => {
        this.logMessage(`Listener created for: ${SignalRReceiveEvent[channel].toString()}`);
        this._connection.on(SignalRReceiveEvent[channel].toString(), callBack);
    }

    protected removeListener = (channel: SignalRReceiveEvent, callBack: (args: any[]) => void) => {
        this.logMessage(`Listener removed for: ${SignalRReceiveEvent[channel].toString()}`);
        this._connection.off(SignalRReceiveEvent[channel].toString(), callBack);
    }

    protected sendPayload = async <T>(channel: SignalRSendEvent, payload?: T) => {
        if (this.isConnected()) {
            try {
                const channelString = SignalRSendEvent[channel].toString();
                if (payload != null) {
                    await this._connection.send(channelString, payload);
                } else {
                    await this._connection.send(channelString);
                }
                this.logMessage('Message sent!', `channel: ${channelString}`, payload);
            }
            catch (e) {
                console.error('sendPayload error', e);
            }
        }
        else {
            console.warn('No connection, cannot send payload!')
        }
    }

    private logMessage = (message: string, ...optionalParams: any[]) => {
        if (!window.config.consoleLogDebug) return;
        console.log(message, optionalParams);
    }
}
