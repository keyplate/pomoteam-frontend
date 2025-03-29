<script>
    import copy from 'copy-to-clipboard';
    import { FileCopyOutline, UserAddOutline } from 'flowbite-svelte-icons';
    import { Popover, Tooltip } from 'flowbite-svelte';
    import { hubState } from '$lib/hub/stores/Stores.js';

    const { users, username } = $hubState;

    /**
     * @arg name {string}
     */
    const toAbbreviation = (name) => {
        const words = name.split(' ');
        return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
    }
</script>

<div class="flex flex-row justify-center items-center gap-1 relative">
    <div class="flex relative gap-1">
        {#each users as user, index}
            <div id={toAbbreviation(user) + index}
                 class="shadow-md px-3 py-2 md:px-[1.15rem] md:py-4 rounded-full text-black font-bold font-mono bg-white -mr-4 border-[1px] border-black border-dashed">
                {toAbbreviation(user)}
            </div>
            <Popover class="text-sm font-light"
                     triggeredBy={'#' + toAbbreviation(user) + index}
                     trigger="hover">
                {user}
            </Popover>
        {/each}
    </div>

    <button id="add-user"
            class="shadow-lg px-5 py-5 md:px-6 md:py-6 rounded-full text-gray-700 font-bold hover:bg-gray-50 bg-white hover:border-amber-200 transition active:translate-y-1 z-10"
            onclick={() => {copy(window.location.href);}}>
        <Tooltip type="light" trigger='click' triggeredBy='#add-user'>
            <div class="bg-gray-200 flex flex-row p-0.5">
                <div>
                    {window.location.href}
                </div>
                <FileCopyOutline></FileCopyOutline>
            </div>

            <div>Copied!</div>
        </Tooltip>
        <UserAddOutline></UserAddOutline>
    </button>
</div>