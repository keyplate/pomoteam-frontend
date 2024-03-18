import { timerState } from '$lib/stores/Stores.js';
import { updates } from './models/Updates.js';

export class UpdateHandler {

    handle(message) {
        message = JSON.parse(message);
        switch (message.update) {
            case updates.STARTED:
                break;
            case updates.PAUSED:
                this.handlePause();
                break;
            case updates.DURATION_ADJUSTMENT:
                this.handleAdjust(message.args);
                break;
            case updates.TIME_UPDATE:
                this.handleTimeUpdate(message.args);
                break;
            default:
                console.log(message)
        }
    }

    handleTimeUpdate(currentTime) {
        timerState.update(state => {
            Math.round(state.currentTime);
            return {...state, currentTime: currentTime}
        });
    }

    handleAdjust(adjustmentDuration) {
        timerState.update(state => {
            return {...state, currentTime: state.currentTime + adjustmentDuration}
        });
    }

    handlePause() {
        timerState.update(state => {
            return {...state, isRunning: false}
        });
    }
}