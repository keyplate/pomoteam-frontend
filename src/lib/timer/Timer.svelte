<script>
    import {Button, ButtonGroup} from 'flowbite-svelte';
    import {IoIosPause, IoIosPlay} from 'svelte-icons/io';
    import ClockFace from '$lib/timer/ClockFace.svelte';

    function onStartClick() {}

    function onPauseClick() {}

</script>

<div class='flex flex-col items-center'>
    <ClockFace minutes={10} seconds={10}></ClockFace>
    <ButtonGroup>
        <Button class='size-16'><IoIosPlay></IoIosPlay></Button>
        <Button class='size-16'><IoIosPause></IoIosPause></Button>
    </ButtonGroup>
</div>