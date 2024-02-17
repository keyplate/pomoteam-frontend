import { Client } from '@stomp/stompjs';

function buildStompClient() {
    const brokerURL = import.meta.env.VITE_MESSAGE_BROKER_ENDPOINT;
    return new Client({
        brokerURL: brokerURL,
        //todo error handling
    });
}

export default buildStompClient;