<script>
    import { run } from 'svelte/legacy';

    import { PauseSolid, PlaySolid } from 'flowbite-svelte-icons';
    import { stompMessenger, timerState } from '$lib/stores/Stores.js';
    import { commands } from '$lib/modules/models/Commands.js';
    import ClockFace from '$lib/timer/ClockFace.svelte';
    import { env } from '$env/dynamic/public';

    let audio = $state();
    const timedOutAudio = env.PUBLIC_TIMED_OUT_AUDIO;
    let buttonClass = ' shadow-md px-6 py-5 ml-2 rounded-full text-gray-700 font-bold hover:bg-emerald-50';
    let activeButtonClass = ' bg-emerald-100 hover:border-amber-200 transition active:translate-y-1 ';
    let seconds = $derived(Math.round($timerState.currentTime % 60));
    let minutes = $derived(Math.floor($timerState.currentTime / 60));

    function onStartClick() {
        $stompMessenger.send(commands.START, { duration: $timerState.currentTime });
    }

    function onPauseClick() {
        $stompMessenger.send(commands.STOP);
    }

    function onAdjustClick(duration) {
        if ($timerState.currentTime + duration > 0) {
            $stompMessenger.send(commands.ADJUST, { adjustmentDuration: duration });
        } else {
            $stompMessenger.send(commands.RESTART, null);
        }
    }

    function playTimedOutNotification() {
        audio.play();
    }

    run(() => {
        if ($timerState.currentTime === 0) playTimedOutNotification();
    });

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
    <audio src={timedOutAudio} bind:this={audio} hidden></audio>
</div>