import { checkHubExists } from '$lib/hub/Hub.js';
import { goto } from '$app/navigation';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const exists = await checkHubExists(params.hubId, fetch);
    console.log(params);
    if (!exists) {
        await goto('/', { replaceState: true });
    }
    return {
        hubId: params.hubId
    };
}