import { updates } from '$lib/modules/hub/models/Updates.js';
import { timerState } from '$lib/stores/Stores.js';

export class UpdateHandler {

    handle(update) {
        switch (update.name) {
            case updates.STARTED: this.handleStart();
            break;
            case updates.PAUSED: this.handlePause();
            break;
            case updates.DURATION_ADJUSTED: this.handleAdjust(update.arg);
            break;
            case updates.TIME_LEFT: this.handleTimeUpdate(Number.parseInt(update.arg));
            break;
            case updates.TIME_OUT: this.handleTimedOut();
            break;
            case updates.CLOSED: this.handleRoomClose();
            break;
            default: console.log(update)
        }
    }

    handleStart() {
        timerState.update(state => ({...state, isRunning: true}));
    }

    handleTimeUpdate(timeLeft) {
        timerState.update(state => (
             { ...state, isRunning: true, timeLeft: Math.round(timeLeft) }
        ));
    }

    handleAdjust(adjustmentDuration) {
        //stub
    }

    handlePause() {
        timerState.update(state => ({ ...state, isRunning: false }
        ));
    }

    handleTimedOut() {
        timerState.update(state => (
            { ...state, currentTime: state.focusDuration, isRunning: false }
        ));
    }

    handleRoomClose() {
        //stub
    }
}