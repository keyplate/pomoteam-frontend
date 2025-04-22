<script>
    import {
        AngleRightOutline,
        ArrowsRepeatOutline, ForwardOutline, ForwardStepSolid, GoToNextCellOutline,
        PauseSolid,
        PlaySolid,
    } from 'flowbite-svelte-icons';
    import { shouldPlayAudio, timerState } from '$lib/timer/stores/Stores.js';
    import ClockFace from '$lib/timer/ClockFace.svelte';
    import { env } from '$env/dynamic/public';

    const FIVE_MINUTES = 300;
    const BUTTON_CLASSES = {
        base: 'shadow-md px-5 py-4 md:px-6 md:py-5  m-1 rounded-full text-gray-700 font-bold hover:bg-emerald-50',
        active: 'bg-white hover:border-amber-200 transition active:translate-y-1'
    };

    let audio = $state();
    let {cmdHandler} = $props()

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

    function onSkipClick() {
        cmdHandler.skip();
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

    <div class='pt-24 lg:pt-10'>
        <div class="flex text-3xl md:text-4xl lg:text-5xl font-bold justify-center items-center">
            {#if $timerState.session === 'FOCUS'}
                <div class='text-black'>Focus</div>
            {:else}
                <div class='text-white'>Break</div>
            {/if}
        </div>

        <ClockFace/>
    </div>


    <div class='flex-col'>
        <div class='flex flex-row items-center flex-grow'>
            {#if $timerState.isRunning}
                <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active, 'hover:bg-indigo-300']}
                        onclick={onPauseClick}>
                    <PauseSolid/>
                </button>
                <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active, 'hover:bg-red-300']} onclick={onResetClick}>
                    <ArrowsRepeatOutline/>
                </button>
            {:else}
                <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active, 'hover:bg-emerald-300']}
                        onclick={onStartClick}>
                    <PlaySolid/>
                </button>
            {/if}
            <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active, 'hover:bg-yellow-100']}
                    onclick={onSkipClick}>
                <ForwardStepSolid/>
            </button>

        </div>

        <div class="flex flex-row items-center justify-center">
            <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active]}
                    onclick={() => onAdjustClick(FIVE_MINUTES)}>
                +5
            </button>

            <button class={[BUTTON_CLASSES.base, BUTTON_CLASSES.active]} onclick={() => onAdjustClick(-FIVE_MINUTES)}>
                -5
            </button>
        </div>
    </div>

    <audio src={env.PUBLIC_TIMED_OUT_AUDIO} bind:this={audio} hidden></audio>
</div>