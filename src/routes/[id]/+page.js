import { checkIfRoomExists } from '$lib/modules/RoomManagement.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const isRoomExists = await checkIfRoomExists(params.id);
    if (!isRoomExists) {
        throw redirect(307, '/');
    }
    return { roomId: params.id };
}