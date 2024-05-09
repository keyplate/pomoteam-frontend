<script>
    export let minutes = 0;
    export let seconds = 0;
</script>

<div class='text-[25vmin] m-4 tabular-nums drop-shadow-lg text-gray-100'>
    {minutes < 10 ? '0' + minutes : minutes}
    :
    {seconds < 10 ? '0' + seconds : seconds}
</div>
