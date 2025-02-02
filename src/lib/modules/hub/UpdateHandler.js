import { isConnected, timerState } from '$lib/stores/Stores.js';
import { updates } from '$lib/modules/hub/models/Updates.js';

export class UpdateHandler {

    handle(message) {
        message = JSON.parse(message);
        switch (message.update) {
            case updates.STARTED: this.handleStart();
            break;
            case updates.PAUSED: this.handlePause();
            break;
            case updates.DURATION_ADJUSTED: this.handleAdjust(message.args);
            break;
            case updates.CURRENT_TIME: this.handleTimeUpdate(message.args);
            break;
            case updates.TIME_OUT: this.handleTimedOut();
            break;
            case updates.ROOM_CLOSED: this.handleRoomClose();
            break;
            default: console.log(message)
        }
    }

    handleStart() {
        timerState.update(state => ({...state, isRunning: true}));
    }

    handleTimeUpdate(currentTime) {
        timerState.update(state => (
             { ...state, isRunning: true, currentTime: Math.round(currentTime) }
        ));
    }

    handleAdjust(adjustmentDuration) {
        timerState.update(state => {
            if (!state.isRunning) {
                return {...state, currentTime: state.currentTime + adjustmentDuration}
            }
            return {...state};
        });
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
        isConnected.set(false);
    }
}