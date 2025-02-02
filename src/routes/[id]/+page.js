/** @type {import('./$types').PageLoad} */
export function load({ url }) {
    const UUID_LENGTH = 36
    const hubId = url.href.slice(-UUID_LENGTH)
    return {
        hubId: hubId
    };
}