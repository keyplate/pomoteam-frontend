import { writable } from 'svelte/store';

export const hubId = writable('');

export const timerState = writable({
    timeLeft: 0,
    session: 'FOCUS',
    isRunning: false,
    isSessionEnded: true,
    focusDuration: 1500,
    breakDuration: 300,
});

export const shouldPlayAudio = writable(false);

export const connection = writable();

export const isHubClosed = writable(false);