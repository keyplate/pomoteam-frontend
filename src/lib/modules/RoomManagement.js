const ROOM_MANAGER_ENDPOINT = import.meta.env.VITE_ROOM_MANAGER_ENDPOINT;

export async function createRoom(roomId) {
    let body = roomId? {roomId: roomId} : {};

    const response = await fetch(ROOM_MANAGER_ENDPOINT,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data.roomId;
}

export async function checkIfRoomExists(roomId) {
    const response = await fetch(`${ROOM_MANAGER_ENDPOINT}/${roomId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.status !== 404;

}

export function deleteRoom(roomId) {
    return fetch(`${ROOM_MANAGER_ENDPOINT}/${roomId}`,{
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}