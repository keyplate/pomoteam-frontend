<script>
    import { Tooltip } from 'flowbite-svelte';
    import { createHub } from '$lib/modules/hub/Hub.js';
    import { goto } from '$app/navigation';
    import copy from 'copy-to-clipboard';
    import { hubId } from '$lib/stores/Stores.js';
    import { AdjustmentsHorizontalSolid, ArrowRightOutline } from 'flowbite-svelte-icons';

    let disableCreate = $state(false);

    async function onCreateClick() {
        try {
            disableCreate = true;
            $hubId = await createHub('');
        } catch (error) {
            console.error('Failed to create hub:', error);
            disableCreate = false;
        }
    }

    function onCopyClick() {
        setTimeout(() => {
            copy(window.location.href);
            goto(`/${$hubId}`, {replaceState: true});
        }, 1000);
    }

</script>
<div class='fixed h-full w-full bg-orange-400'>

    <header class={'bg-orange-500'}>
        <div class="flex flex-row gap-2 pt-2 pb-4 border-b-4 px-6 md:px-14 xl:px-64 2xl:px-96">
            <span class="flex-auto text-4xl md:text-6xl lg:text-7xl text-white font-bold self-center">Pomoteam</span>
        </div>
    </header>
    <div class='flex justify-center items-center mt-44 px-10 font-sans'>
        <div>
            <p class='text-3xl mb-8 text-center'>Welcome to <span class="font-bold">Pomoteam:</span></p>
            <p class='text-1xl mb-5 '>
                Boost your team's focus and efficiency with Pomoteam, the collaborative Pomodoro timer that keeps
                everyone in sync.
            </p>
            <p class='text-1xl mb-5 '> Create shared work sessions and maintain collective momentum through
                coordinated work and break cycles.</p>
            <div class='text-1xl font-sans'>
                <span class="mr-0.5">To start</span>
                <button onclick={onCreateClick}
                        class='bg-blue-700 px-1 py-0.5 rounded-md text-gray-300 border-2 border-blue-800 hover:border-amber-200'>generate a link</button>
                <span>and share it with you peers</span>
            </div>
            {#if disableCreate}
                <div class='w-full ml-10 flex flex-row'>
                    <div class='flex flex-row items-center'>
                        <ArrowRightOutline/>
                        <div class='border-0 underline underline-offset-8 shadow-sm text-center py-1 px-2'>{$hubId}</div>
                    </div>
                    <button id='copy-button' onclick={onCopyClick}
                            class='bg-blue-700 px-1 py-0.5 ml-2 rounded-md text-gray-300 font-bold border-2 border-blue-800 hover:border-amber-200'>
                        copy
                    </button>
                    <Tooltip trigger='click' triggeredBy='#copy-button'>Copied!</Tooltip>
                </div>
            {/if}
        </div>
    </div>
</div>
<style lang='postcss'></style>