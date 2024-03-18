import { PUBLIC_MESSAGE_ENDPOINT } from '$env/static/public';

export class StompMessenger {

    constructor(stompClient, roomId) {
        this.stompClient = stompClient;
        this.roomId = roomId;
        this.BROKER_ENDPOINT = PUBLIC_MESSAGE_ENDPOINT;
    }

    send(command, args) {
        this.stompClient.publish({
            destination: `${this.BROKER_ENDPOINT}/${this.roomId}`,
            body: JSON.stringify({command: command, args: args})
        });
    }
}