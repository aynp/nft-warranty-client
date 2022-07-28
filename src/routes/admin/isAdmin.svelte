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

<form on:submit|preventDefault={checkAdmin}>
  <label for="walletAddress">Wallet Address</label>
  <input type="text" bind:value={walletAddress} />
  <button type="submit">Submit</button>
</form>

<div class="result" hidden={!showResult}>
  {#if isAdmin}
    <p>Address {walletAddress} is an admin.</p>
  {:else}
    <p>Address {walletAddress} is not an admin.</p>
  {/if}
</div>
