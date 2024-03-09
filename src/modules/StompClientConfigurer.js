import { Client } from '@stomp/stompjs';

const TOPIC =   import.meta.env.VITE_TOPIC;

//todo: consider error handling;
function buildStompClient(roomId, callback) {
    const brokerURL = import.meta.env.VITE_MESSAGE_BROKER_ENDPOINT;
    const client =  new Client({
        brokerURL: brokerURL,
        onConnect: () => {
            client.subscribe(`${TOPIC}/${roomId}`, (message) => {
                callback(message.body);
            });
        },
        debug: (str) => {
            console.log(str);
        }
    });
    client.activate();
    return client;
}

export default buildStompClient;