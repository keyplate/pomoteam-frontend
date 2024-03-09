<script>
    import { PauseSolid, PlaySolid } from 'flowbite-svelte-icons';
    import { Button, ButtonGroup } from 'flowbite-svelte';
    import { stompMessenger, timerState } from '../../stores/Stores.js';
    import { commands } from '../../modules/models/Commands.js';
    import ClockFace from '$lib/timer/ClockFace.svelte';

    let isRunning = false;
    $: seconds = Math.round($timerState.currentTime % 60);
    $: minutes = Math.floor($timerState.currentTime / 60);

    function onStartClick() {
        isRunning = true;
        $stompMessenger.send(commands.START, {duration: $timerState.currentTime});
    }

    function onPauseClick() {
        isRunning = false;
        $stompMessenger.send(commands.STOP);
    }

    function onAdjustClick(duration) {
        if (isRunning) {
            $stompMessenger.send(commands.ADJUST, {duration: duration})
        } else {
            const newCurrent = $timerState.currentTime + duration;
            timerState.update(state => ({...state, currentTime: newCurrent}));
        }
    }

</script>

<div class='flex flex-col items-center'>
    <div class='flex flex-row items-center'>
        <Button class='size-12 m-2 font-bold'
                on:click={()=>onAdjustClick(300)}>+5</Button>
        <ClockFace {minutes} {seconds}></ClockFace>
        <Button class='size-12 m-2 font-bold'
                on:click={()=>onAdjustClick(-300)}>-5</Button>
    </div>
    <ButtonGroup>
        <Button class='size-16' on:click={onStartClick}>
            <PlaySolid></PlaySolid>
        </Button>
        <Button class='size-16' on:click={onPauseClick}>
            <PauseSolid></PauseSolid>
        </Button>
    </ButtonGroup>
</div>