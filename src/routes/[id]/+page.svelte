<script>
    import Timer from '$lib/timer/Timer.svelte';
    import { onMount } from 'svelte';
    import { connection, hubId, isHubClosed } from '$lib/stores/Stores.js';
    import openConnection from '$lib/modules/WebSocketConnection.js';
    import { AdjustmentsHorizontalSolid, ShareAllSolid } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';

    let { data } = $props()
    const BUTTON_CLASS = 'shadow-md px-6 py-5 ml-2 mt-2 rounded-full text-gray-700 font-bold hover:bg-emerald-50 bg-emerald-100 hover:border-amber-200 transition active:translate-y-1';

    onMount(() => {
        if ($hubId === null || $hubId === '') {
            if (data.hubId === undefined || data.hubId === null) {
                goto('/', { replaceState: true });
                return;
            }
            $hubId = data.hubId;
        }

        try {
            $connection = openConnection($hubId);
        } catch (error) {
            console.error('Failed to establish connection:', error);
        }

        return () => {
            if (!$connection) {
                return;
            }
            $connection.disconnect()
        };
    });

    $effect(() => {
        if ($isHubClosed) {
            goto('/', { replaceState: true });
        }
    })
</script>

<div class='flex flex-col min-h-screen'>
    <header class='bg-green-500 p-4 flex flex-row items-center gap-2'>
        <button class={BUTTON_CLASS}
                title="Share">
            <ShareAllSolid />
        </button>
        <button class={BUTTON_CLASS}
                title="Settings">
            <AdjustmentsHorizontalSolid />
        </button>
    </header>

    <main class='flex-grow flex items-center justify-center'>
        <Timer />
    </main>
</div>