import { commands } from '$lib/hub/models/Commands.js';

/**
 * @description - Sends commands to the server. Commands alter the behaviour of the timer, and/or provides necessary information to it.
 * */
export class CommandHandler {
    /**
     * @constructor
     * @param {WebSocketConnection} connection - connection to the server
    **/
    constructor(connection) {
        this.connection = connection;
    }

    /**
     * @description - Set username, obviously. But also update username list and notify other users of the newcomer.
     * @param name {string}
     **/
    setUserName(name) {
        this.connection.send({type: "HUB", name: commands.SET_USER_NAME, args: {name: name}});
    }

    /**
     * @description - start the timer.
     **/
    start() {
        this.connection.send({type: "TIMER", name: commands.START})
    }

    /**
     * @description - resume the timer.
     **/
    resume() {
        this.connection.send({type: "TIMER", name: commands.RESUME})
    }

    /**
     * @description - pause the timer.
     **/
    pause() {
        this.connection.send({type: "TIMER", name: commands.PAUSE})
    }

    /**
     * @description - stops the session and resets time to current session duration.
     * */
    reset() {
        this.connection.send({type: "TIMER", name: commands.RESET})
    }

    /**
     * @description - adjust timeLeft or duration of the session. Server decides on what to adjust depending on the context, which is whether timer is running and/or session is finished.
     * @arg duration {number} - Adjustment amount in seconds.
     * */
    adjust(duration) {
        this.connection.send({type: "TIMER", name: commands.ADJUST, args: {duration: duration.toString()}});
    }
}