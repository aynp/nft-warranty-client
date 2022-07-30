<script lang="ts">
  import { ContractWithSigner } from '$lib/contract';
  import { noop } from 'svelte/internal';

  const product = {
    ownerWallet: '',
    productID: '',
    serialNo: '',
  };

  let promise: any = Promise.resolve([]);
  let showResult = false;
  let waiting = true;
  let sold = false;

  const mintNFT = async () => {
    try {
      const tokenID = product.productID + product.serialNo;
      const tx = await ContractWithSigner.mintWarrantyNFT(
        product.ownerWallet,
        product.productID,
        tokenID
      );
      await tx.wait();
      sold = true;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleSubmit = () => {
    showResult = true;
    promise = mintNFT();
  };

  const reset = () => {
    waiting = true;
    sold = false;
    showResult = false;
  };
</script>

<div class="basicWindow">
  <h1>Sell Product</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={handleSubmit}>
      <label for="ownerWallet">Buyers Address</label>
      <input type="text" bind:value={product.ownerWallet} on:submit={reset} />

      <label for="productID">Product ID</label>
      <input type="text" bind:value={product.productID} on:submit={reset} />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={product.serialNo} on:submit={reset} />

      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div
  class="result {waiting ? 'waiting' : ''} {sold ? 'sold' : ''}"
  hidden={!showResult}>
  {#await promise}
    <p>Selling...</p>
  {:then result}
    <p>Sold product having Serial No. {product.serialNo}.</p>
  {:catch err}
    <p>Failed.</p>
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
    color: white;
    background: linear-gradient(
      90deg,
      rgba(55, 36, 230, 1) 0%,
      rgba(0, 105, 255, 1) 100%
    );
  }
  .sold {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(36, 230, 126, 1) 0%,
      rgb(20, 216, 2) 100%
    );
  }
</style>
