import { HubOperationError } from '$lib/errors/hubError.js';
import { ERROR_MESSAGES } from '$lib/errors/hubError.js';
import { ERROR_TYPES } from '$lib/errors/hubError.js';
import { env } from '$env/dynamic/public';

const HUB_ENDPOINT = env.PUBLIC_HUB_ENDPOINT;

/**
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
        if (response.status === 409) { // Example status code for conflict
            throw new HubOperationError(
                ERROR_MESSAGES[ERROR_TYPES.ALIAS_CONFLICT],
                ERROR_TYPES.ALIAS_CONFLICT
            );
        }
        throw new HubOperationError(
            ERROR_MESSAGES[ERROR_TYPES.SERVER],
            ERROR_TYPES.SERVER
        );
    }

    const data = await response.json();
    return data.id;
}

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
        if (error instanceof HubOperationError) {
            throw error;
        }
        throw new HubOperationError(
            ERROR_MESSAGES[ERROR_TYPES.NETWORK],
            ERROR_TYPES.NETWORK
        );
    }
}

export async function deleteRoom(hubId) {
    if (!hubId) {
        throw new HubOperationError(
            ERROR_MESSAGES[ERROR_TYPES.INVALID_HUB_ID],
            ERROR_TYPES.INVALID_HUB_ID
        );
    }

    try {
        const response = await fetch(`${HUB_ENDPOINT}/${hubId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Handle specific status codes
        switch (response.status) {
            case 200:
            case 204:
                return true; // Successfully deleted
            case 404:
                throw new HubOperationError(
                    ERROR_MESSAGES[ERROR_TYPES.HUB_NOT_FOUND],
                    ERROR_TYPES.HUB_NOT_FOUND
                );
            default:
                throw new HubOperationError(
                    ERROR_MESSAGES[ERROR_TYPES.SERVER],
                    ERROR_TYPES.SERVER
                );
        }
    } catch (error) {
        if (error instanceof HubOperationError) {
            throw error;
        }
        throw new HubOperationError(
            ERROR_MESSAGES[ERROR_TYPES.NETWORK],
            ERROR_TYPES.NETWORK
        );
    }
}