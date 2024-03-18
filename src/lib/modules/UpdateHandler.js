import { timerState } from '$lib/stores/Stores.js';
import { updates } from './models/Updates.js';

export class UpdateHandler {

    handle(message) {
        message = JSON.parse(message);
        switch (message.update) {
            case updates.STARTED:
                break;
            case updates.STOPPED:
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
}