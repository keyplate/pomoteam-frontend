<script>
    import { PauseSolid, PlaySolid } from 'flowbite-svelte-icons';
    import { Button, ButtonGroup } from 'flowbite-svelte';
    import { stompMessenger, timerState } from '$lib/stores/Stores.js';
    import { commands } from '$lib/modules/models/Commands.js';
    import ClockFace from '$lib/timer/ClockFace.svelte';
    import { PUBLIC_TIMED_OUT_AUDIO } from '$env/static/public'

    let audio;
    const timedOutAudio = PUBLIC_TIMED_OUT_AUDIO;
    $: seconds = Math.round($timerState.currentTime % 60);
    $: minutes = Math.floor($timerState.currentTime / 60);

    function onStartClick() {
        $stompMessenger.send(commands.START, {duration: $timerState.currentTime});
    }

    function onPauseClick() {
        $stompMessenger.send(commands.STOP);
    }

    function onAdjustClick(duration) {
        if ($timerState.currentTime + duration > 0) {
            $stompMessenger.send(commands.ADJUST, {adjustmentDuration: duration})
        }
    }

    function playTimedOutNotification() {
        audio.play();
    }

    $: if($timerState.currentTime === 0) playTimedOutNotification();

</script>

<div class='flex flex-col items-center'>
    <div class='flex flex-row items-center'>
        <Button class='size-12 m-2 font-bold'
                on:click={()=>onAdjustClick(300)}>+5
        </Button>
        <ClockFace {minutes} {seconds}></ClockFace>
        <Button class='size-12 m-2 font-bold'
                on:click={()=>onAdjustClick(-300)}>-5
        </Button>
    </div>
    <ButtonGroup>
        <Button class='size-16' on:click={onStartClick}>
            <PlaySolid></PlaySolid>
        </Button>
        <Button class='size-16' on:click={onPauseClick}>
            <PauseSolid></PauseSolid>
        </Button>
    </ButtonGroup>
    <audio src={timedOutAudio} bind:this={audio} hidden></audio>
</div>