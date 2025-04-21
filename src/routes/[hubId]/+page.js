import { checkHubExists } from '$lib/hub/Hub.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const exists = await checkHubExists(params.hubId, fetch);
    if (!exists) {
        return redirect(303, '/');
    }
    return {
        hubId: params.hubId
    };
}