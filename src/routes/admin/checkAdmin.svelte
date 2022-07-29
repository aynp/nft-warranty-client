<script lang="ts">
  import Contract from '$lib/contract';

  let walletAddress = '';
  let showResult = false;
  let isAdmin = false;
  let promise: any = Promise.resolve([]);
  let waiting = true;

  const checkAdmin = async () => {
    console.log(walletAddress);
    try {
      showResult = true;
      isAdmin = await Contract.isAdmin(walletAddress);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleSubmit = () => {
    reset();
    promise = checkAdmin().then(() => {
      waiting = false;
    });
  };

  const reset = () => {
    waiting = true;
    showResult = false;
    isAdmin = false;
    document.getElementsByClassName('result')[0].classList.remove('admin');
    document.getElementsByClassName('result')[0].classList.remove('not-admin');
  };
</script>

<div class="basicWindow">
  <h1>Check Admin</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={handleSubmit}>
      <label for="walletAddress">Wallet Address</label>
      <input type="text" bind:value={walletAddress} on:input={reset} />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div
  class="result {isAdmin ? 'admin' : 'not-admin'} {waiting ? 'waiting' : ''}"
  hidden={!showResult}>
  {#await promise}
    <p>Waiting</p>
  {:then result}
    {#if isAdmin}
      <p>Address {walletAddress} is an admin.</p>
    {:else}
      <p>Address {walletAddress} is not an admin.</p>
    {/if}
  {:catch err}
    <p>Err {err}</p>
  {/await}
</div>

<style>
  .result {
    min-width: 50%;
    text-align: center;
    margin: 20px auto;
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.4s;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 8px;
    font-size: 1.2rem;
  }

  .waiting {
    background: linear-gradient(
      90deg,
      rgba(55, 36, 230, 1) 0%,
      rgba(0, 105, 255, 1) 100%
    );
  }

  .not-admin {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(252, 0, 0, 1) 0%,
      rgba(249, 53, 34, 1) 100%
    );
  }

  .admin {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(36, 230, 126, 1) 0%,
      rgb(20, 216, 2) 100%
    );
  }
</style>
