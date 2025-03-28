<script>
    import {
        ArrowsRepeatOutline,
        PauseSolid,
        PlaySolid,
    } from 'flowbite-svelte-icons';
    import { shouldPlayAudio, timerState } from '$lib/timer/stores/Stores.js';
    import { connection } from '$lib/hub/stores/Stores.js';
    import { commands } from '$lib/hub/models/Commands.js';
    import ClockFace from '$lib/timer/ClockFace.svelte';
    import { env } from '$env/dynamic/public';
    import { CommandHandler} from '$lib/hub/CommandHandler.js';

    const FIVE_MINUTES = 300;
    const BUTTON_CLASSES = {
        base: 'shadow-md px-5 py-4 md:px-6 md:py-5 lg:px-8 lg:py-7 m-1 rounded-full text-gray-700 font-bold hover:bg-emerald-50',
        active: 'bg-white hover:border-amber-200 transition active:translate-y-1'
    };

    let audio = $state();
    let { cmdHandler } = $props()

    function onStartClick() {
        if (!$timerState.isSessionEnded) {
            cmdHandler.resume()
            return;
        }
        cmdHandler.start();
    }

    function onPauseClick() {
        cmdHandler.pause();
    }

    function onResetClick() {
        cmdHandler.reset();
    }

    function onAdjustClick(duration) {
        cmdHandler.adjust(duration);
    }

    $effect(() => {
        if (!$shouldPlayAudio) {
            return;
        }
        audio?.play().catch(error => console.warn('Audio playback failed:', error));
        $shouldPlayAudio = false;
    });
</script>

<div class='flex flex-col items-center flex-grow'>

    <div class='pt-24'>
        <div class="flex text-3xl md:text-4xl lg:text-5xl font-bold justify-center">
            {#if $timerState.session === 'FOCUS'}
                <div class='text-red-950'>Focus</div>
            {:else}
                <div class='text-white'>Break</div>
            {/if}
        </div>

        <ClockFace/>
    </div>


    <div class='inline-flex'>
        <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active]}
                onclick={() => onAdjustClick(FIVE_MINUTES)}>
            +5
        </button>

        {#if $timerState.isRunning}
            <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active, 'hover:bg-blue-500']} onclick={onPauseClick}>
                <PauseSolid/>
            </button>
            <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active, 'hover:bg-red-400']} onclick={onResetClick}>
                <ArrowsRepeatOutline/>
            </button>
        {:else}
            <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active, 'hover:bg-emerald-600']}
                    onclick={onStartClick}>
                <PlaySolid/>
            </button>
        {/if}

        <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active]} onclick={() => onAdjustClick(-FIVE_MINUTES)}>
            -5
        </button>
    </div>

    <audio src={env.PUBLIC_TIMED_OUT_AUDIO} bind:this={audio} hidden></audio>
</div>