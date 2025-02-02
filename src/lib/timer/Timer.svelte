<script>
    import { PauseSolid, PlaySolid } from 'flowbite-svelte-icons';
    import { connection, timerState } from '$lib/stores/Stores.js';
    import { commands } from '$lib/modules/hub/models/Commands.js';
    import ClockFace from '$lib/timer/ClockFace.svelte';
    import { env } from '$env/dynamic/public';

    let audio = $state();
    let seconds = $derived(Math.round($timerState.currentTime % 60));
    let minutes = $derived(Math.floor($timerState.currentTime / 60));

    const buttonClass = ' shadow-md px-6 py-5 ml-2 rounded-full text-gray-700 font-bold hover:bg-emerald-50';
    const activeButtonClass = ' bg-emerald-100 hover:border-amber-200 transition active:translate-y-1 ';

    function onStartClick() {
        $connection.send({ name: commands.START, arg: $timerState.currentTime });
    }

    function onPauseClick() {
        $connection.send(commands.STOP);
    }

    /**
     * @param {number} duration
     */
    function onAdjustClick(duration) {
        if ($timerState.currentTime + duration > 0) {
            $connection.send(commands.ADJUST, { adjustmentDuration: duration });
        } else {
            $connection.send(commands.RESTART, null);
        }
    }

    $effect(() => {
        if ($timerState.currentTime === 0) {
            audio.play();
        }
    })
</script>

<div class='flex flex-col items-center h-full'>
    <div class='flex flex-row items-center'>
        <ClockFace {minutes} {seconds}></ClockFace>
    </div>
    <div class='inline-flex'>
        <button class='{buttonClass + activeButtonClass}'
                onclick={()=>onAdjustClick(300)}>+5
        </button>
        <button
            class='{buttonClass + (!$timerState.isRunning? activeButtonClass : "transition-colors duration-500 bg-emerald-400")} '
            onclick={onStartClick}>
            <PlaySolid></PlaySolid>
        </button>
        <button
            class='{buttonClass  + ($timerState.isRunning? activeButtonClass : "transition-colors duration-500 bg-red-400")} '
            onclick={onPauseClick}>
            <PauseSolid></PauseSolid>
        </button>
        <button class='{buttonClass + activeButtonClass}'
                onclick={()=>onAdjustClick(-300)}>-5
        </button>
    </div>
    <audio src={env.PUBLIC_TIMED_OUT_AUDIO} bind:this={audio} hidden></audio>
</div>