<script>
    import Timer from '$lib/timer/Timer.svelte';
    import { onMount } from 'svelte';
    import { isConnected, roomId, stompMessenger } from '$lib/stores/Stores.js';
    import openConnection from '$lib/modules/ConnectionManagement.js';
    import { StompMessenger } from '$lib/modules/StompMessenger.js';
    import { AdjustmentsHorizontalSolid, ShareAllSolid } from 'flowbite-svelte-icons';

    let { data } = $props();

    const buttonClass = 'shadow-md px-6 py-5 ml-2 mt-2 rounded-full text-gray-700 font-bold hover:bg-emerald-50 bg-emerald-100 hover:border-amber-200 transition active:translate-y-1';

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

<div class='flex flex-col h-screen'>
    <header class='bg-green-500 h-16 flex flex-col items-start'>
        <button class={buttonClass}>
            <ShareAllSolid />
        </button>
        <button class={buttonClass}>
            <AdjustmentsHorizontalSolid />
        </button>
    </header>
    <div class='mt-16 flex-grow'>
        <Timer></Timer>
    </div>
</div>
