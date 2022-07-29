<script lang="ts">
  import { ContractWithSigner } from '$lib/contract';

  const productInfo = {
    from: '',
    to: '',
    productID: '',
    serialNo: '',
  };

  let promise: any = Promise.resolve([]);
  let showResult = false;
  let waiting = true;
  let transfered = false;

  const transferProduct = async () => {
    try {
      const tokenID = productInfo.productID + productInfo.serialNo;
      const tx = await ContractWithSigner.transferFrom(
        productInfo.from,
        productInfo.to,
        tokenID
      );
      await tx.wait();
      transfered = true;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleSubmit = () => {
    reset();
    showResult = true;
    promise = transferProduct();
  };

  const reset = () => {
    waiting = true;
    transfered = false;
    showResult = false;
  };
</script>

<div class="basicWindow">
  <h1>Transfer Product</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={handleSubmit}>
      <label for="walletAddress">Owner Wallet Address</label>
      <input type="text" bind:value={productInfo.from} on:input={reset} />

      <label for="walletAddress">New Owner Wallet Address</label>
      <input type="text" bind:value={productInfo.to} on:input={reset} />

      <label for="productID">Product ID</label>
      <input type="text" bind:value={productInfo.productID} on:input={reset} />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} on:input={reset} />

      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div
  class="result {waiting ? 'waiting' : ''} {transfered ? 'transfered' : ''}"
  hidden={!showResult}>
  {#await promise}
    <p>Transfering...</p>
  {:then result}
    <p>Product transfered.</p>
  {:catch err}
    <p>Failed to transfer product.</p>
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
  .transfered {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(36, 230, 126, 1) 0%,
      rgb(20, 216, 2) 100%
    );
  }
</style>
