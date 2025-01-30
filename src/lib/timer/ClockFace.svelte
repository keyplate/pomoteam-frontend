<script>
    /**
     * @typedef {Object} Props
     * @property {number} [minutes]
     * @property {number} [seconds]
     */

    /** @type {Props} */
    let { minutes = 0, seconds = 0 } = $props();
</script>

<div class='text-[25vmin] m-4 tabular-nums drop-shadow-lg text-gray-100'>
    {minutes < 10 ? '0' + minutes : minutes}
    :
    {seconds < 10 ? '0' + seconds : seconds}
</div>
