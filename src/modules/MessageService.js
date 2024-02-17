import buildStompClient from './StompClient.js';

export class MessageService {

    constructor() {
        this.client = buildStompClient();
        this.topic = import.meta.env.VITE_MESSAGE_BROKER_ENDPOINT;
    }

    subscribe(roomId, callback) {
        this.client.subscribe(`${this.topic}/${roomId}`, callback);
    }

    onMessageReceived(message) {
        //todo implement onMessageReceived
        console.log(message.body)
    }
}