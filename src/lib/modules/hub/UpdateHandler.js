import { updates } from '$lib/modules/hub/models/Updates.js';
import { timerState } from '$lib/stores/Stores.js';

export class UpdateHandler {

    handlers = new Map();

    constructor() {
        this.handlers.set(updates.STATE, this.handleState)
        this.handlers.set(updates.STARTED, this.handleStart);
        this.handlers.set(updates.SESSION_UPDATE, this.handleSessionUpdate);
        this.handlers.set(updates.PAUSED, this.handlePause);
        this.handlers.set(updates.DURATION_ADJUSTED, this.handleAdjust);
        this.handlers.set(updates.TIME_UPDATE, this.handleTimeUpdate);
        this.handlers.set(updates.TIME_OUT, this.handleTimedOut);
        this.handlers.set(updates.CLOSED, this.handleRoomClose);
    }

    handle(update) {
        const handler = this.handlers.get(update.name);

        if (!handler) {
            return;
        }
        handler(update);
    }

    handleState(update) {
        timerState.update(state => {
                const timeLeft = Number.parseInt(update.args.timeLeft);
                const breakDuration = Number.parseInt(update.args.breakDuration);
                const focusDuration = Number.parseInt(update.args.focusDuration);

                return {
                    ...state,
                    timeLeft: timeLeft,
                    breakDuration: breakDuration,
                    focusDuration: focusDuration,
                    isRunning: update.args.isRunning === "true",
                    state: update.args.sessionType,
                }
        });
    }

    handleStart(update) {
        timerState.update(state => ({...state, isRunning: update.args.isRunning === "true"}));
    }

    handleTimeUpdate(update) {
        const timeLeft = Number.parseInt(update.args.timeLeft);
        timerState.update(state => (
            {...state, timeLeft: timeLeft}
        ));
    }

    handleAdjust(update) {
        timerState.update(state => {
            if (state.isRunning) {
                return state;
            }

            const timeLeft = Number.parseInt(update.args.timeLeft);
            const breakDuration = Number.parseInt(update.args.breakDuration);
            const focusDuration = Number.parseInt(update.args.focusDuration);

            return {...state, timeLeft: timeLeft, focusDuration: focusDuration, breakDuration: breakDuration};
        })
    }

    handlePause(update) {
        timerState.update(state => ({...state, isRunning: update.args.isRunning === "true"}));
    }

    handleTimedOut(update) {
        timerState.update(state => (
            {...state, isRunning: update.args.isRunning === "true"}
        ));
    }

    handleSessionUpdate(update) {
        timerState.update(state => (
            {...state, session: update.args.sessionType}));
    }

    handleRoomClose() {/**stub**/}
}