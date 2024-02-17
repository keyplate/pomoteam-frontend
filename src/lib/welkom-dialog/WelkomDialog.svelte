<script>
    import {Button, ButtonGroup, Input, Modal, Span, Tooltip} from 'flowbite-svelte';
    import { roomId } from '../../stores/roomProperties.js';
    import { createRoom } from '../../modules/RoomManagement.js';
    import copy from 'copy-to-clipboard';

    let open = true;
    let dismissable = false;
    let shouldDisableCreate = false;


    async function onClickCreateRandom() {
        shouldDisableCreate = true;
        await createSharableLink();
    }

    async function createSharableLink(customName) {
        const response = await createRoom(customName? customName : '');
        const data = await response.json();
        roomId.set(data.roomId);
    }

    function onCopyClick() {

        setTimeout(function() {
            copy($roomId);
            open = false;
        }, 1000);
    }

</script>

<Modal {open} {dismissable}>
    <Span>Create a sharable link for your pomodoro room</Span>
        <ButtonGroup class='w-full'>
            <Input value={$roomId} readonly={shouldDisableCreate} />
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