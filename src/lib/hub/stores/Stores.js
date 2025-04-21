import { writable } from 'svelte/store';
import { User } from '$lib/users/models/User.js';

export const hubState = writable({
    users: User[null],
    currentUser: new User('', ''),
});

export const isHubClosed = writable(false);