import { EmoteButton } from '../constants/emote/emoteButton';

export interface IStreamEmoteButton {
    id: EmoteButton;
    imageName?: string;
    imageUrl: string;
    tags: Array<string>;
    sortOrder: number;
}