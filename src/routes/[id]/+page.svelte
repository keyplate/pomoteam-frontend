<script>
    import Timer from '$lib/timer/Timer.svelte';
    import { onMount } from 'svelte';
    import { isConnected, roomId, stompMessenger } from '$lib/stores/Stores.js';
    import openConnection from '$lib/modules/ConnectionManagement.js';
    import { StompMessenger } from '$lib/modules/StompMessenger.js';

    export let data;

    onMount(() => {
        if ($isConnected) {
            return;
        }
        $roomId = data.roomId;
        const client = openConnection($roomId);
        $stompMessenger = new StompMessenger(client, $roomId);
    });

</script>

<style lang='postcss'></style>

<div>
    <div class='mt-16'>
        <Timer></Timer>
    </div>
</div>