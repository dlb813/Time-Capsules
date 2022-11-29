<script>
  import { closeModal } from "svelte-modals";

  // provided by <Modals />
  export let isOpen = false;

  export let title;
  export let message;
  export let email;
  export let date;
  export let file;
  export let rDate;
  let success = false;
  let submit = () => {
    //console.log(postEmail);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        email: email.emailVal,
        message: message.messageVal,
        date: rDate,
        file: file.fileVal,
      })
    );

    xhr.open("POST", "http://localhost:3000/upload", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        file: file.fileVal,
      })
    );

    success = true;
  };
  async function postEmail() {
    const data = (
      await fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify({
          email: email.emailVal,
          message: message.messageVal,
          date: date.dateVal,
          file: file.fileVal,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    console.log(await data);
  }
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      {#if (email.emailVal != null && message.messageVal != null && date.dateVal != null)&&!success}
        <h2>Confirmation</h2>
        <ul><p>Email: {email.emailVal}</p></ul>
        <ul>
          <p>Message: {message.messageVal}</p>
        </ul>
        <ul>
          <p>DateTime: {date.dateVal} EST</p>
        </ul>
        <ul>
          <p>Files: {file.fileVal}</p>
        </ul>
        <div class="actions">
          <button on:click={submit}>Submit</button>
        </div>
      {/if}
      {#if (email.emailVal == null || message.messageVal == null || date.dateVal == null)&&!success}
        <h2>Error!</h2>
        <ul>
          {#if email.emailVal == null}<p class="error">Missing Email</p>{/if}
        </ul>
        <ul>
          {#if message.messageVal == null}<p class="error">
              Missing Message
            </p>{/if}
        </ul>
        <ul>
          {#if date.dateVal == null}<p class="error">Missing Date</p>{/if}
        </ul>

        <div class="actions">
          <button on:click={()=>{success=false;isOpen=false;closeModal; }}>Close</button>
        </div>
      {/if}
      {#if success}
        <h2>Success</h2>
        <ul><p>Time capsule successfully stored</p></ul>

        
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: -5vh;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    justify-content: center;
    align-items: center;
    z-index: 99;
    width: 80vw;
    height: 70vh;
    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    outline: solid black;
  }

  h2 {
    text-align: center;
    font-size: xx-large;
  }

  p {
    text-align: center;
    margin-top: 16px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }

  .error {
    color: red;
    font: bolder;
    font-size: larger;
  }
</style>
