<script>
    import { createHub } from '$lib/hub/Hub.js';
    import { goto } from '$app/navigation';
    import copy from 'copy-to-clipboard';
    import { hubId } from '$lib/hub/stores/Stores.js';
    import {
        EnvelopeOutline,
        GithubSolid,
    } from 'flowbite-svelte-icons';

    async function onCreateClick() {
        try {
            $hubId = await createHub('');
            await goto(`/${$hubId}`, {replaceState: true});
            copy(window.location.href);
        } catch (error) {
            console.error('Failed to create hub:', error);
        }
    }

</script>
<div class='flex flex-col min-h-screen bg-orange-100 '>

    <header class={'bg-orange-500 flex-grow-0'}>
        <div class="flex flex-row gap-2 pt-2 pb-4 border-b-4 px-6 md:px-14 xl:px-64 2xl:px-96">
            <span class="flex-auto text-4xl md:text-6xl lg:text-7xl text-white font-bold self-center">Pomoteam</span>
        </div>
    </header>

    <div class='flex-grow gap-2 pt-2 pb-4 md:px-14 xl:px-64 2xl:px-[25vw]'>
        <div class='bg-blue-200 m-16 mx-8 md:mx-16 p-2.5 rounded-xl -rotate-3 shadow-lg'>
            <p class='text-3xl mb-8 text-center'>
                Welcome to <span class="font-bold">Pomoteam:</span>
            </p>
            <p class='text-xl mb-5 '>
                Boost your team's focus and efficiency with Pomoteam, the collaborative Pomodoro timer that keeps
                everyone in sync.
            </p>
            <div class='text-xl font-sans'>
                <span class="mr-0.5">To start</span>
                <button onclick={onCreateClick}
                        class='bg-blue-700 px-1 py-0.5 rounded-md text-white border-2 border-blue-800 hover:border-amber-200'>
                    <span class="font-bold">Create a room</span>
                </button>
            </div>
            <div class="mt-2 ml-2"> * The link will be copied to your clipboard, share it with your buddies!</div>
        </div>

        <div class='bg-yellow-100 m-16 mx-8 md:mx-16 mt-24 p-5 rounded-xl rotate-3 shadow-lg'>
            <p class='text-3xl mb-8 text-center'>
                <span class="font-bold">How</span> it works?
            </p>
            <ol class='list-decimal pl-4 text-xl'>
                <li>Create a room with a single click</li>
                <li>Share the link with your team members</li>
                <li>Decide on your goals for the session and share them</li>
                <li>Decide how much time you are willing to work on your goals</li>
                <li>Go!</li>
            </ol>

        </div>

        <div class='bg-emerald-200 m-16 mx-8 md:mx-16 p-2.5 rounded-xl -rotate-2 shadow-lg text-xl'>
            <p class='text-3xl mb-8 text-center'>
                Why <span class="font-bold font-sans">collaborative</span>?
            </p>
            <p>
                Focusing is easier when you're not alone.
                Pomotime leverages the
                <a class="font-bold text-blue-700 underline" href="https://en.wikipedia.org/wiki/Body_doubling">body
                    doubling</a> technique where the presence of others helps maintain accountability and motivation.
            </p>
        </div>


    </div>

    <footer class='flex-grow-0 bg-orange-500 shadow-lg'>
        <div class='flex flex-row justify-center gap-4 pt-2 text-white font-bold'>
            <div>
                <a class='flex flex-row gap-2 py-2' href='https://github.com/keyplate/pomoteam-frontend'>
                    <GithubSolid color="white"/>
                    Contribute
                </a>
            </div>
            <div>
                <a class='flex flex-row gap-2 py-2' href='mailto:[kyrylo.lap@gmail.com]?subject=pomoteam'>
                    <EnvelopeOutline color="white"/>
                    Contact Me
                </a>
            </div>
        </div>
    </footer>
</div>
<style lang='postcss'></style>