<script>
  import uploadLogo from "./assets/1092216 1.svg";
  import check from "./assets/3917090.png";
  import Counter from "./lib/Counter.svelte";
  import Button from "./DoneButton.svelte";
  import { Modals, closeModal } from "svelte-modals";
  import Confirm from "./Confirm.svelte";
  import { openModal } from "svelte-modals";
  let messageVal;
  let emailVal;
  let dateVal;
  let fileVal;
  let date2;
  function handleClick() {
    if (dateVal != null) {
      date2 = dateVal;
      let temp = dateVal.substring(11, dateVal.length);
      dateVal = dateVal.substring(0, 10);
      dateVal = dateVal + ", " + temp;
    }
    openModal(Confirm, {
      title: "Alert",
      message: { messageVal },
      email: { emailVal },
      date: { dateVal },
      file: { fileVal },
      rDate: date2,
    });
  }
</script>

<main>
  <div>
    <div class="Header">Time Capsules</div>
    <div class="area">
      <ul class="circles">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>
    <div style="position: absolute; left:0px; top:0px;">
      <div class="container" style="color: black">
        <div class="gridItem" style="padding-top: 5%">
          <ul>
            <input
              type="text"
              placeholder="Email"
              style="height: 4vh;"
              class="inputs"
              id="email"
              bind:value={emailVal}
            />
          </ul>
          <ul>
            <textarea
              rows="5"
              cols="60"
              name="Message"
              class="inputs"
              style="height: 30vh; resize: none"
              placeholder="Enter message..."
              onclick="this.select();"
              bind:value={messageVal}
              id="message"
            />
          </ul>
          <ul>
            <input
              type="datetime-local"
              class="inputs"
              style="height: 4vh;"
              id="date"
              bind:value={dateVal}
            />
          </ul>

          <Modals bind:messageVal>
            <div slot="backdrop" class="backdrop" on:click={closeModal} />
          </Modals>
        </div>
        {#if fileVal == null}
          <div class="gridItem" style="grid-row:span 2;padding-top: 5%">
            <label for="file-upload" class="custom-file-upload">
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img
                src={uploadLogo}
                alt="A picture of a file"
                class="uploadImg"
              />
              <br />Upload Files
            </label>
            <input
              id="file-upload"
              type="file"
              bind:value={fileVal}
              name="fileVal"
            />
          </div>
        {/if}
        {#if fileVal != null}
          <div class="gridItem" style="grid-row:span 2;padding-top: 5%">
            <label for="file-upload" class="custom-file-upload">
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img
                src={check}
                alt="A picture of a file"
                class="uploadImg"
                style="height: 70%; padding-bottom:4vh"
              />
              <br />{fileVal}
            </label>
            <input
              id="file-upload"
              type="file"
              bind:value={fileVal}
              name="fileVal"
            />
          </div>
        {/if}
        <div class="gridItem;" style="border: solid grey">
          <button class="doneButton" on:click={handleClick}>SUBMIT</button>
        </div>
        <div class="gridItem" style="grid-column: span 2; font-size: larger;">
          Send a message to your future self!
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }

  .context {
    width: 100%;
    position: absolute;
    top: 50vh;
  }

  .context h1 {
    text-align: center;
    color: rgb(168, 97, 97);
    font-size: 50px;
  }

  .area {
    background:#F7FFF7;
    background: -webkit-linear-gradient(to left, #4d55ed, #4e54c8);
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0px;
    top: 0px;
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(108, 166, 193,.4);
    animation: animate 25s linear infinite;
    bottom: -150px;
  }

  .circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  .circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
</style>
