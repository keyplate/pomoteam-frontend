<script>
    import { PauseSolid, PlaySolid } from 'flowbite-svelte-icons';
    import { connection, timerState } from '$lib/stores/Stores.js';
    import { commands } from '$lib/modules/hub/models/Commands.js';
    import ClockFace from '$lib/timer/ClockFace.svelte';
    import { env } from '$env/dynamic/public';

    const FIVE_MINUTES = 300;
    const BUTTON_CLASSES = {
        base: 'shadow-md px-6 py-5 ml-2 rounded-full text-gray-700 font-bold hover:bg-emerald-50',
        active: 'bg-emerald-100 hover:border-amber-200 transition active:translate-y-1',
        running: 'transition-colors duration-500 bg-emerald-400',
        stopped: 'transition-colors duration-500 bg-red-400'
    };

    let audio = $state();
    let seconds = $derived(Math.round($timerState.timeLeft % 60));
    let minutes = $derived(Math.floor($timerState.timeLeft / 60));

    function getButtonClasses(isControlButton = false, isRunning = false) {
        if (!isControlButton) return `${BUTTON_CLASSES.base} ${BUTTON_CLASSES.active}`;
        return `${BUTTON_CLASSES.base} ${isRunning ? BUTTON_CLASSES.running : BUTTON_CLASSES.stopped}`;
    }

    function onStartClick() {
        $connection.send({name: commands.START, arg: $timerState.timeLeft.toString()});
    }

    function onPauseClick() {
        $connection.send({name: commands.STOP});
    }

    /**
     * @param {number} duration
     */
    function onAdjustClick(duration) {
        $connection.send({name: commands.ADJUST, arg: duration.toString()});
    }

    $effect(() => {
        if ($timerState.timeLeft === 0) {
            audio?.play().catch(error => console.warn('Audio playback failed:', error));
        }
    });
</script>

<div class='flex flex-col items-center h-full'>
    <div class='flex flex-row items-center'>
        <ClockFace {minutes} {seconds}/>
    </div>

    <div class='inline-flex'>
        <button class={getButtonClasses()}
                onclick={() => onAdjustClick(FIVE_MINUTES)}>
            +5
        </button>

        <button class={getButtonClasses(true, !$timerState.isRunning)}
                onclick={onStartClick}>
            <PlaySolid/>
        </button>

        <button class={getButtonClasses(true, $timerState.isRunning)} onclick={onPauseClick}>
            <PauseSolid/>
        </button>

        <button class={getButtonClasses()} onclick={() => onAdjustClick(-FIVE_MINUTES)}>
            -5
        </button>
    </div>

    <audio src={env.PUBLIC_TIMED_OUT_AUDIO}
            bind:this={audio}
            hidden></audio>
</div>