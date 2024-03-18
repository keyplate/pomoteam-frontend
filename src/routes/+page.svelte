<script>
    import { Button, ButtonGroup, Input, Modal, Span, Tooltip } from 'flowbite-svelte';
    import { roomId, stompMessenger } from '$lib/stores/Stores.js';
    import { StompMessenger } from '$lib/modules/StompMessenger.js';
    import { createRoom } from '$lib/modules/RoomManagement.js';
    import { goto } from '$app/navigation';
    import copy from 'copy-to-clipboard';
    import openConnection from '$lib/modules/ConnectionManagement.js';


    let open = true;
    let dismissable = false;
    let shouldDisableCreate = false;


    async function onClickCreateRandom() {
        shouldDisableCreate = true;
        await createSharableLink();
        initConnection();
    }

    function onCopyClick() {
        setTimeout(() => {
            copy($roomId);
            open = false;
            goto(`/${$roomId}`, {replaceState: true});
        }, 1000);
    }

    async function createSharableLink(customName) {
        $roomId = await createRoom(customName ? customName : '');
    }

    function initConnection() {
        const client = openConnection($roomId);
        $stompMessenger = new StompMessenger(client, $roomId);
    }

</script>

<Modal {dismissable} {open}>
    <Span>Create a sharable link for your pomodoro room</Span>
    <ButtonGroup class='w-full'>
        <Input readonly={shouldDisableCreate} value={$roomId}/>
        {#if !shouldDisableCreate}
            <Button>create custom</Button>
            <Button on:click={onClickCreateRandom}>create random</Button>
        {:else}
            <Button id='copy-button' on:click={onCopyClick}>copy</Button>
            <Tooltip trigger='click' triggeredBy='#copy-button'>Copied!</Tooltip>
        {/if}
    </ButtonGroup>
</Modal>

<style lang='postcss'></style>