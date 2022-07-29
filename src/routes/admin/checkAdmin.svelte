<script>
  import Contract from '$lib/contract';

  let walletAddress = '';
  let showResult = false;
  let isAdmin = false;

  const checkAdmin = async () => {
    console.log(walletAddress);
    try {
      isAdmin = await Contract.isAdmin(walletAddress);
      showResult = true;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<div class="basicWindow">
  <h1>Check Admin</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={checkAdmin}>
      <label for="walletAddress">Wallet Address</label>
      <input type="text" bind:value={walletAddress} />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div class="result {isAdmin ? 'admin' : 'not-admin'}" hidden={!showResult}>
  {#if isAdmin}
    <p>Address {walletAddress} is an admin.</p>
  {:else}
    <p>Address {walletAddress} is not an admin.</p>
  {/if}
</div>

<style>
  .result {
    margin: 20px auto;
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.4s;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 8px;
    transition: all 2s ease-in;
    font-size: 1.2rem;
  }
  .admin {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(36, 230, 126, 1) 0%,
      rgb(20, 216, 2) 100%
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
</style>
