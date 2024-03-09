import { writable } from 'svelte/store';

export const roomId = writable('');

export const timerState = writable(
    {
        currentTime: 1200,
        session: 'focus',
        isRunning: false,
    }
);

export const stompMessenger = writable();