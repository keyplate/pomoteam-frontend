import { writable } from 'svelte/store';

export const hubId = writable('');

export const hubState = writable({
    users: [],
    username: '',
});

export const connection = writable();

export const isHubClosed = writable(false);