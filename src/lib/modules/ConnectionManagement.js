import { Client } from '@stomp/stompjs';
import { isConnected } from '$lib/stores/Stores.js';
import { UpdateHandler } from './UpdateHandler.js';

const TOPIC = import.meta.env.VITE_TOPIC;

//todo: consider error handling;
function openConnection(roomId) {
    const brokerURL = import.meta.env.VITE_MESSAGE_BROKER_ENDPOINT;
    const updateHandler = new UpdateHandler();

    const client =  new Client({
        brokerURL: brokerURL,
        onConnect: () => {
            client.subscribe(`${TOPIC}/${roomId}`, (message) => {
                updateHandler.handle(message.body);
            });
            isConnected.set(true);
        },
        onDisconnect: () => {
            isConnected.set(false);
        },
        debug: (str) => {
            console.log(str);
        }
    });
    client.activate();
    return client;
}

export default openConnection;