<script>
    import { timerState } from '$lib/timer/stores/Stores.js';

    const getCurrentTimeSource = () => {
        let currentTime = 0;
        if ($timerState.isRunning || !$timerState.isSessionEnded) {
            currentTime = $timerState.timeLeft;
        } else if ($timerState.session === 'FOCUS') {
            currentTime = $timerState.focusDuration;
        } else if ($timerState.session === 'BREAK') {
            currentTime = $timerState.breakDuration;
        }

        if (currentTime) {
            return currentTime;
        }
        return 0;
    }

    let minutes = $derived(Math.floor(getCurrentTimeSource() / 60));
    let seconds = $derived(Math.round(getCurrentTimeSource() % 60));

    /**
     * @param word {string}
     */
    const capitalize = (word) => {
       return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
</script>

<svelte:head>
    {#if $timerState.isRunning}
        <title>
            {capitalize($timerState.session)}
            {minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}
        </title>
    {/if}
</svelte:head>

<div class={['text-[25vmin] mx-4 mb-4 tabular-nums drop-shadow-lg', $timerState.session === 'FOCUS' ? 'text-black' : 'text-white']}>
    {minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}
</div>
