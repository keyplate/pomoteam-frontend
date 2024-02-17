const ROOM_MANAGER_ENDPOINT = import.meta.env.VITE_ROOM_MANAGER_ENDPOINT;

export function createRoom(roomId) {
    let body = roomId? {roomId: roomId} : {};

    return fetch(ROOM_MANAGER_ENDPOINT,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
}

export function deleteRoom(roomId) {
    //todo
}