import { writable } from 'svelte/store';

export const hubId = writable('');

export const timerState = writable(
    {
        timeLeft: 10,
        session: 'focus',
        isRunning: false,
        focusDuration: 1500,
        breakDuration: 300,
        longBreakDuration: 900,
    }
);

export const connection = writable();