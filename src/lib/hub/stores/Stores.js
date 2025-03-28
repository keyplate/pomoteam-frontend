import { writable } from 'svelte/store';

export const hubState = writable({
    users: [],
    username: '',
});

export const isHubClosed = writable(false);