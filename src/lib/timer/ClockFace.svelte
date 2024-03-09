<script>
    export let minutes = 0;
    export let seconds = 0;
</script>

<div class='text-8xl m-4 tabular-nums'>
    {minutes < 10? '0' + minutes : minutes}
    :
    {seconds < 10? '0' + seconds : seconds}
</div>
