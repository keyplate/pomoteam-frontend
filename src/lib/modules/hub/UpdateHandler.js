import { updates } from '$lib/modules/hub/models/Updates.js';
import { timerState } from '$lib/stores/Stores.js';

export class UpdateHandler {

    handlers = new Map();

    constructor() {
        this.handlers.set(updates.STARTED, this.handleStart);
        this.handlers.set(updates.PAUSED, this.handlePause);
        this.handlers.set(updates.DURATION_ADJUSTED, this.handleAdjust);
        this.handlers.set(updates.TIME_LEFT, this.handleTimeUpdate);
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

    handleStart() {
        timerState.update(state => ({...state, isRunning: true}));
    }

    handleTimeUpdate(update) {
        const timeLeft = Number.parseInt(update.timeLeft);
        timerState.update(state => (
            {...state, isRunning: true, timeLeft: Math.round(timeLeft)}
        ));
    }

    handleAdjust(update) {
        const timeLeft = Number.parseInt(update.timeLeft);
        timerState.update(state => {
            if (state.isRunning) {
                return state;
            }
            return {...state, timeLeft: timeLeft};
        })
    }

    handlePause() {
        timerState.update(state => ({...state, isRunning: false}));
    }

    handleTimedOut() {
        timerState.update(state => (
            {...state, currentTime: state.focusDuration, isRunning: false}
        ));
    }

    handleRoomClose() {/**stub**/}
}