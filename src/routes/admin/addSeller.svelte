<script>
  import { ContractWithSigner } from '$lib/contract';

  let walletAddress = '';

  const addSeller = async () => {
    console.log(walletAddress);
    try {
      const tx = await ContractWithSigner.addSeller(walletAddress);
      await tx.wait();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<div class="basicWindow">
  <h1>Add Seller</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={addSeller}>
      <label for="walletAddress">Wallet Address</label>
      <input type="text" bind:value={walletAddress} />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>
