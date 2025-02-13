/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        hubId: params.id
    };
}