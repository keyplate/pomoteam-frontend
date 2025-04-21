import { updates } from '$lib/hub/models/Updates.js';
import { shouldPlayAudio, timerState } from '$lib/timer/stores/Stores.js';
import { hubState, isHubClosed } from '$lib/hub/stores/Stores.js';
import { User } from '$lib/users/models/User.js';
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
        this.handlers.set(updates.USERS, this.handleUsers);
        this.handlers.set(updates.USER_NAME, this.handleUsername);
        this.handlers.set(updates.USER_ID, this.handleUserId);
    }

    handle = (update) => {
        const handler = this.handlers.get(update.name);

        if (!handler) {
            return;
        }
        handler(update);
    }

    handleState = (update) => {
        const timeLeft = update.args.timeLeft;
        const breakDuration = update.args.breakDuration;
        const focusDuration = update.args.focusDuration;
        const isSessionEnded = update.args.isSessionEnded;
        const isRunning = update.args.isRunning;
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
        const isSessionEnded = update.args.isSessionEnded;
        const isRunning = update.args.isRunning;
        const timeLeft = update.args.timeLeft;

        timerState.update(state => ({...state, isRunning: isRunning, isSessionEnded: isSessionEnded, timeLeft: timeLeft}));
    }

    handleResume = (update) => {
        timerState.update(state => ({...state, isRunning: update.args.isRunning}));
    }

    handleTimeUpdate = (update) => {
        const timeLeft = update.args.timeLeft;

        timerState.update(state => ({...state, timeLeft: timeLeft}));
    }

    handleAdjust = (update) => {
        timerState.update(state => {
            if (state.isRunning) {
                return state;
            }

            const timeLeft = update.args.timeLeft;
            const breakDuration = update.args.breakDuration;
            const focusDuration = update.args.focusDuration;

            return {...state, timeLeft: timeLeft, focusDuration: focusDuration, breakDuration: breakDuration};
        })
    }

    handlePause = (update) => {
        const isRunning = update.args.isRunning;

        timerState.update(state => ({...state, isRunning: isRunning}));
    }

    handleReset = (update) => {
        const isSessionEnded = update.args.isSessionEnded;
        const isRunning = update.args.isRunning;

        timerState.update(state => ({...state, isRunning: isRunning, isSessionEnded: isSessionEnded}))
    }

    handleTimeOut = (update) => {
        const isSessionEnded = update.args.isSessionEnded;
        const isRunning = update.args.isRunning;

        timerState.update(state => ({...state, isRunning: isRunning, isSessionEnded: isSessionEnded}));
        shouldPlayAudio.set(true);
    }

    handleSessionUpdate = (update) => {
        timerState.update(state => ({...state, session: update.args.sessionType}));
    }

    handleUserId = (update) => {
        hubState.update(state => ({
            ...state, currentUser: new User(update.args.id),
        }))
    }

    handleUsers = (update) => {
        hubState.update(state => {
            //Current user should not be in the user List
            const users = update.args.users.filter(
                (user) => user.id !== state.currentUser.id
            );
            //Current user may have been updated
            const newCurrentUser = update.args.users.find(
                (user) => user.id === state.currentUser.id
            );

            return {...state, users: users, currentUser: newCurrentUser};
        })
    }

    handleRoomClose = () => {
        isHubClosed.set(true);
    }
}