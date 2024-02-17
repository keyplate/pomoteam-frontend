<script>
    import { MessageService} from '../modules/MessageService.js';
    import { RoomManagement } from '../modules/RoomManagement.js';
    import { Button, Input, Modal } from 'flowbite-svelte';

    const messageService = new MessageService();
    const roomService = new RoomManagement();

    let client;
    let open = true;
    let dismissable = false;

    $:roomId = '';

    function connect() {
        roomService.createRoom()
                   .then((resp) => resp.json())
            .then(data => {
                roomId = data.roomId;
                client = messageService.connect(roomId);
                client.activate();
                dismissable = true;
            })
            .catch((error) => {

        })
    }


</script>

<Modal {open} {dismissable}>
    <Input readonly value={roomId}></Input>
    <Button on:click={connect}>Generate random id</Button>
    <Button>Give your room a name!</Button>
</Modal>

<style lang="postcss"></style>
