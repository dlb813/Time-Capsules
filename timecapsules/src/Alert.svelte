<script>
    import { closeModal } from "svelte-modals";
    export let isOpen=false;
    export let message;
    export let title;
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="contents">
            <ul>
                <p>Message: {message.messageVal}</p>
            </ul>
            <div class="actions">
                <button on:click={close}>Done</button>
            </div>
        </div>
    </div>
{/if}
