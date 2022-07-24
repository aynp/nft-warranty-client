<script>
  import Contract from '$lib/contract';

  let walletAddress = '';

  const addSeller = async () => {
    console.log(walletAddress);
    try {
      const tx = await Contract.removeAdmin(walletAddress);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<form on:submit|preventDefault={addSeller}>
  <label for="walletAddress">Wallet Address</label>
  <input type="text" bind:value={walletAddress} />
  <button type="submit">Submit</button>
</form>
