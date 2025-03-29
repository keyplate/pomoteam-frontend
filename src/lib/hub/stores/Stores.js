import { writable } from 'svelte/store';

export const hubState = writable({
    users: ['Kyrylo Lapchenko', 'Martin Luther', 'Jane Aan Zee', ],
    username: 'John Lennon',
});

export const isHubClosed = writable(false);