import { HubOperationError } from '$lib/hub/errors/hubError.js';
import { ERROR_MESSAGES } from '$lib/hub/errors/hubError.js';
import { ERROR_TYPES } from '$lib/hub/errors/hubError.js';
import { env } from '$env/dynamic/public';

/**
 * @file - manages hub lifecycle
 */

const HUB_ENDPOINT = env.PUBLIC_HUB_ENDPOINT;

/**
 * @description - creates a hub. Hub represents a shared space for collaboration which syncs state of the app between users.
 * @param {string} hubId
 * @return {Promise<string>}
 */
export async function createHub(hubId) {
    const body = hubId ? {alias: hubId} : {};

    const response = await fetch(HUB_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new HubOperationError(
            ERROR_MESSAGES[ERROR_TYPES.SERVER],
            ERROR_TYPES.SERVER
        );
    }

    const data = await response.json();
    return data.id;
}

/**
 * @description - checks if hub exists to prevent websocket connection to a nonexistent hub.
 * @arg {string} hubId
 * @arg {function} fetch
 * @return {Promise<boolean>}
 */
export async function checkHubExists(hubId, fetch) {
    if (!hubId) {
        throw new HubOperationError(
            ERROR_MESSAGES[ERROR_TYPES.INVALID_HUB_ID],
            ERROR_TYPES.INVALID_HUB_ID
        );
    }

    try {
        const response = await fetch(`${HUB_ENDPOINT}/${hubId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.status === 200;

    } catch (error) {
        throw new HubOperationError(
            ERROR_MESSAGES[ERROR_TYPES.NETWORK],
            ERROR_TYPES.NETWORK
        );
    }
}