<script>
    import { timerState } from '$lib/stores/Stores.js';

    const getCurrentTimeSource = () => {
        let currentTime = 0;
        if ($timerState.isRunning) {
            currentTime = $timerState.timeLeft;
        } else if ($timerState.session === 'FOCUS') {
            currentTime = $timerState.focusDuration;
        }else if ($timerState.session === 'BREAK') {
            currentTime = $timerState.breakDuration;
        }

        if (currentTime) {
            return currentTime;
        }
        return 0;
    }

    let minutes = $derived(Math.floor(getCurrentTimeSource() / 60));
    let seconds = $derived(Math.round(getCurrentTimeSource() % 60));
</script>

<div class='text-[25vmin] m-4 tabular-nums drop-shadow-lg text-gray-100'>
    {minutes < 10 ? '0' + minutes : minutes}
    :
    {seconds < 10 ? '0' + seconds : seconds}
</div>
