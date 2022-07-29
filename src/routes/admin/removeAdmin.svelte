<script>
  import { ContractWithSigner } from '$lib/contract';

  let walletAddress = '';

  const removeAdmin = async () => {
    console.log(walletAddress);
    try {
      const tx = await ContractWithSigner.removeAdmin(walletAddress);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<div class="basicWindow">
  <h1>Remove Admin</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={removeAdmin}>
      <label for="walletAddress">Wallet Address</label>
      <input type="text" bind:value={walletAddress} />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>
