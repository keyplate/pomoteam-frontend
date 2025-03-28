import { updates } from '$lib/hub/models/Updates.js';
import { shouldPlayAudio, timerState } from '$lib/timer/stores/Stores.js';
import { hubState, isHubClosed } from '$lib/hub/stores/Stores.js';
export class UpdateHandler {
    handlers = new Map();

    constructor() {
        this.handlers.set(updates.STATE, this.handleState);
        this.handlers.set(updates.STARTED, this.handleStart);
        this.handlers.set(updates.SESSION_UPDATE, this.handleSessionUpdate);
        this.handlers.set(updates.PAUSED, this.handlePause);
        this.handlers.set(updates.DURATION_ADJUSTED, this.handleAdjust);
        this.handlers.set(updates.TIME_UPDATE, this.handleTimeUpdate);
        this.handlers.set(updates.TIME_OUT, this.handleTimeOut);
        this.handlers.set(updates.CLOSED, this.handleRoomClose);
        this.handlers.set(updates.RESUMED, this.handleResume);
        this.handlers.set(updates.TIMER_RESET, this.handleReset);
        this.handlers.set(updates.USERS, this.handleUsers)
    }

    handle = (update) => {
        const handler = this.handlers.get(update.name);

        if (!handler) {
            return;
        }
        handler(update);
    }

    handleState = (update) => {
        const timeLeft = Number.parseInt(update.args.timeLeft);
        const breakDuration = Number.parseInt(update.args.breakDuration);
        const focusDuration = Number.parseInt(update.args.focusDuration);
        const isSessionEnded = this.parseBool(update.args.isSessionEnded);
        const isRunning = this.parseBool(update.args.isRunning);
        const sessionType = update.args.sessionType;

        timerState.update(state => {
            return {
                ...state,
                timeLeft: timeLeft,
                breakDuration: breakDuration,
                focusDuration: focusDuration,
                isRunning: isRunning,
                isSessionEnded: isSessionEnded,
                session: sessionType,
            }
        });
    }

    handleStart = (update) => {
        const isSessionEnded = this.parseBool(update.args.isSessionEnded);
        const isRunning = this.parseBool(update.args.isRunning);
        const timeLeft = Number.parseInt(update.args.timeLeft);

        timerState.update(state => ({
            ...state, isRunning: isRunning, isSessionEnded: isSessionEnded, timeLeft: timeLeft
        }));
    }

    handleResume = (update) => {
        timerState.update(state => ({
            ...state, isRunning: this.parseBool(update.args.isRunning)
        }));
    }

    handleTimeUpdate = (update) => {
        const timeLeft = Number.parseInt(update.args.timeLeft);

        timerState.update(state => ({
            ...state, timeLeft: timeLeft
        }));
    }

    handleAdjust = (update) => {
        timerState.update(state => {
            if (state.isRunning) {
                return state;
            }

            const timeLeft = Number.parseInt(update.args.timeLeft);
            const breakDuration = Number.parseInt(update.args.breakDuration);
            const focusDuration = Number.parseInt(update.args.focusDuration);

            return {
                ...state, timeLeft: timeLeft, focusDuration: focusDuration, breakDuration: breakDuration
            };
        })
    }

    handlePause = (update) => {
        const isRunning = this.parseBool(update.args.isRunning);

        timerState.update(state => ({
            ...state, isRunning: isRunning
        }));
    }

    handleReset = (update) => {
        const isSessionEnded = this.parseBool(update.args.isSessionEnded);
        const isRunning = this.parseBool(update.args.isRunning);

        timerState.update(state => ({
            ...state, isRunning: isRunning, isSessionEnded: isSessionEnded,
        }))
    }

    handleTimeOut = (update) => {
        const isSessionEnded = this.parseBool(update.args.isSessionEnded);
        const isRunning = this.parseBool(update.args.isRunning);

        timerState.update(state => ({
            ...state, isRunning: isRunning, isSessionEnded: isSessionEnded
        }));
        shouldPlayAudio.set(true);
    }

    handleSessionUpdate = (update) => {
        timerState.update(state => ({
            ...state, session: update.args.sessionType
        }));
    }

    handleUsers = (update) => {
        hubState.update(state => ({
            ...state, update: update.args.users
        }))
    }

    handleRoomClose = () => {
        isHubClosed.set(true);
    }

    parseBool = (jsonValue) => {
        return jsonValue === 'true';
    }
}