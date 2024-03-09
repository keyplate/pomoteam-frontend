<script>
    import Timer from '$lib/timer/Timer.svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { isConnected, roomId, stompMessenger } from '../stores/Stores.js';
    import { checkIfRoomExists } from '../modules/RoomManagement.js';
    import { StompMessenger } from '../modules/StompMessenger.js';
    import openConnection from '../modules/ConnectionManagement.js';

    onMount(() => {
        if ($isConnected) {
            return;
        }

        console.log($page.url.pathname.substring(1))
        const isExisting = checkIfRoomExists($page.url.pathname.substring(1));

        const client = openConnection($roomId);
        $stompMessenger = new StompMessenger(client, $roomId);
    })
</script>

<style lang='postcss'></style>

<div>
    <div class='mt-16'>
        <Timer></Timer>
    </div>
</div>