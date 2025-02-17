import { checkHubExists } from '$lib/modules/hub/Hub.js';
import { goto } from '$app/navigation';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const exists = await checkHubExists(params.id, fetch);
    if (!exists) {
        await goto('/', { replaceState: true });
    }
    return {
        hubId: params.id
    };
}