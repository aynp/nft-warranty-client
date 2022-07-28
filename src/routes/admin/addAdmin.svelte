<script lang="ts">
  import Contract from '$lib/contract';

  let walletAddress = '';

  const addAdmin = async () => {
    console.log(walletAddress);
    try {
      const tx = await Contract.addAdmin(walletAddress);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<form on:submit|preventDefault={addAdmin}>
  <label for="walletaddress">Wallet Address</label>
  <input type="text" bind:value={walletAddress} />
  <button type="submit">Submit</button>
</form>
