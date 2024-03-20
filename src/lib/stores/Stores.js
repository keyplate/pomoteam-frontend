import { writable } from 'svelte/store';

export const roomId = writable('');

export const isConnected = writable(false);

export const timerState = writable(
    {
        currentTime: 10,
        session: 'focus',
        isRunning: false,
        focusDuration: 1500,
        breakDuration: 300,
        longBreakDuration: 900,
    }
);

export const stompMessenger = writable();