import Swal from 'sweetalert2';

import { StreamEmoteButtonIcon } from '../../components/streamEmotes/streamEmoteButtonIcon';
import { EmoteButton } from '../../constants/emote/emoteButton';
import { ToastService } from '../../services/common/toast/toastService';

export const warningSpamSingleEmoji = () =>
    Swal.fire({
        icon: 'warning',
        title: 'Woah!',
        text: 'I think we all get the point, please don\'t spam a single emoji 😅',
        allowOutsideClick: false,
    });

export const warningRateLimitFromServer = () =>
    Swal.fire({
        icon: 'warning',
        title: 'Too Many!',
        text: 'You have submitted too many emojis, please slow down 😅',
        allowOutsideClick: false,
    });

export const successEmoteSubmitted = (toastService: ToastService, newSelectedEmote: EmoteButton) =>
    toastService.success(
        <StreamEmoteButtonIcon
            emoteId={newSelectedEmote}
            message="was submitted successfully"
        />
    );


export const errorEmoteNotSubmitted = (toastService: ToastService, newSelectedEmote: EmoteButton) =>
    toastService.error(
        <StreamEmoteButtonIcon
            emoteId={newSelectedEmote}
            message="was not submitted"
        />
    );

export const warningSpamShowLeaderboard = () =>
    Swal.fire({
        icon: 'warning',
        title: 'Woah!',
        text: 'I think we all get the point, please don\'t spam the show leaderboard button 😅',
        allowOutsideClick: false,
    });