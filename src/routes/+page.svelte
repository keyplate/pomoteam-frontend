<script>
    import { Tooltip } from 'flowbite-svelte';
    import { createHub } from '$lib/modules/hub/Hub.js';
    import { goto } from '$app/navigation';
    import copy from 'copy-to-clipboard';
    import { hubId } from '$lib/stores/Stores.js';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';

    let disableCreate = $state(false);

    async function onCreateClick() {
        disableCreate = true;
        $hubId = await createHub('');
    }

    function onCopyClick() {
        setTimeout(() => {
            copy($hubId);
            goto(`/${$hubId}`, { replaceState: true });
        }, 1000);
    }

</script>
<div class='fixed h-full w-full bg-green-500'>
    <div class='flex justify-center items-center mt-44 px-10'>
        <div>
            <p class='text-3xl font-bold mb-8'>Welcome to $cool_name timer:</p>
            <p class='text-1xl font-bold mb-5 ml-4'>It's dedicated to help you work within pomodoro framework with a
                team.</p>
            <div class='flex flex-row items-center mb-3'>
                <pre class='text-1xl font-bold mx-7 font-sans'>To start  <button onclick={onCreateClick}
                                                                                 class='bg-green-700 px-2 py-1 rounded-md text-gray-300 border-2 border-green-800 hover:border-amber-200'>generate a link</button>  and share it with you peers</pre>
            </div>
            {#if disableCreate}
                <div class='w-full ml-10 flex flex-row'>
                    <div class='flex flex-row items-center'>
                        <ArrowRightOutline />
                        <div
                            class='border-0 underline underline-offset-8 shadow-sm text-center py-1 px-2'>{$hubId}</div>
                    </div>
                    <button id='copy-button' onclick={onCopyClick}
                            class='bg-green-700 px-2 py-1 ml-2 rounded-md text-gray-300 font-bold border-2 border-green-800 hover:border-amber-200'>
                        copy
                    </button>
                    <Tooltip trigger='click' triggeredBy='#copy-button'>Copied!</Tooltip>
                </div>
            {/if}
        </div>
    </div>
</div>
<style lang='postcss'></style>