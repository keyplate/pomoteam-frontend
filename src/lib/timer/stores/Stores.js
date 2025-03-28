import { writable } from 'svelte/store';

export const timerState = writable({
    timeLeft: 0,
    session: 'FOCUS',
    isRunning: false,
    isSessionEnded: true,
    focusDuration: 1500,
    breakDuration: 300,
});

export const shouldPlayAudio = writable(false);