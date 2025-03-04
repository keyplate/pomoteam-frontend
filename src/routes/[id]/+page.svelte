<script>
    import Timer from '$lib/timer/Timer.svelte';
    import { fly, fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { connection, hubId, isHubClosed, timerState } from '$lib/stores/Stores.js';
    import openConnection from '$lib/modules/WebSocketConnection.js';
    import { AdjustmentsHorizontalSolid, ShareAllSolid } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';

    let { data } = $props()
    const BUTTON_CLASS = 'shadow-md px-5 py-4 md:px-6 md:py-5 rounded-full text-gray-700 font-bold hover:bg-emerald-50 bg-emerald-100 hover:border-amber-200 transition active:translate-y-1';

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

<div>
    {#if $timerState.session === 'BREAK'}
        <div class="-z-10 absolute min-w-full min-h-full bg-blue-400" in:fly out:fade></div>
    {:else}
        <div class="-z-10 absolute min-w-full min-h-full bg-green-400" in:fly out:fade></div>
    {/if}
    <div class="flex flex-col px-6 md:px-14 xl:px-64 2xl:px-96 min-h-screen">
        <header class="flex flex-row gap-2 pt-2 pb-4 border-b-4 justify-between">
            <button class={BUTTON_CLASS}
                    title="Share">
                <ShareAllSolid />
            </button>

            <span class="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center self-center">Pomoteam</span>

            <button class={BUTTON_CLASS}
                    title="Settings">
                <AdjustmentsHorizontalSolid />
            </button>
        </header>

        <Timer />

        <footer class="relative mb-4 hover:inline">

        </footer>
    </div>
</div>