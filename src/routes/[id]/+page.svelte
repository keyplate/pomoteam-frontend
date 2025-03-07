<script>
    import Timer from '$lib/timer/Timer.svelte';
    import { fly, fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { connection, hubId, isHubClosed, timerState } from '$lib/stores/Stores.js';
    import openConnection from '$lib/modules/WebSocketConnection.js';
    import {
        AdjustmentsHorizontalSolid, FileCopyOutline,
        UserAddOutline
    } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
    import { Tooltip } from 'flowbite-svelte';
    import copy from 'copy-to-clipboard';

    let {data} = $props()
    const BUTTON_CLASS = 'shadow-md px-4 py-3 md:px-6 md:py-5 rounded-full text-gray-700 font-bold hover:bg-gray-50 bg-white hover:border-amber-200 transition active:translate-y-1';

    onMount(() => {
        if ($hubId === null || $hubId === '') {
            if (data.hubId === undefined || data.hubId === null) {
                goto('/', {replaceState: true});
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
            goto('/', {replaceState: true});
        }
    })
</script>

<div>
    {#if $timerState.session === 'BREAK'}
        <div class="-z-10 absolute min-w-full min-h-full bg-blue-300" in:fly out:fade></div>
    {:else}
        <div class="-z-10 absolute min-w-full min-h-full bg-orange-100 bg-opacity-85" in:fly out:fade></div>
    {/if}
    <div class="flex flex-col min-h-screen min-w-full">
        <header class={$timerState.session === 'FOCUS'? 'bg-orange-500' : 'bg-blue-500'}>
            <div class="flex flex-row gap-2 pt-2 pb-4 border-b-2 px-6 md:px-14 xl:px-64 2xl:px-96">
                <span class="flex-auto text-4xl md:text-6xl lg:text-7xl text-white font-bold self-center">Pomoteam</span>



                <button class={[BUTTON_CLASS, 'flex-grow-0']}
                        title="Settings"
                        id="settings">
                    <AdjustmentsHorizontalSolid/>
                </button>
                <Tooltip type="light" trigger='click' triggeredBy='#settings'>Soon!</Tooltip>
            </div>
        </header>

        <Timer/>

        <footer class="flex flex-row gap-2 pt-2 pb-4 px-6 md:px-14 xl:px-64 2xl:px-96 justify-center">
            <button id="add-user" class={[BUTTON_CLASS]} onclick={() => {copy(window.location.href);}}>
                <Tooltip type="light" trigger='click' triggeredBy='#add-user'>
                    <div class="bg-gray-200 flex flex-row p-0.5">
                       <div>
                           {window.location.href}
                       </div>
                        <FileCopyOutline></FileCopyOutline>
                    </div>

                    <div>Copied!</div>
                </Tooltip>
                <UserAddOutline class="float-left m-0.5"></UserAddOutline>
            </button>
        </footer>
    </div>
</div>