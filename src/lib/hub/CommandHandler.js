import { commands } from '$lib/hub/models/Commands.js';

export class CommandHandler {
    /**
     * @constructor
     * @param {WebSocketConnection} connection - connection to timer server
    **/
    constructor(connection) {
        this.connection = connection;
    }

    /**
     * @description - Set username, obviously. But also  to let server update username list and notify other users of the newcomer.
     * @param name {string}
     **/
    setUserName(name) {
        this.connection.send({name: commands.SET_USER_NAME, args: name});
    }
}