<script lang="ts">
  import Contract, { ContractWithSigner } from '$lib/contract';

  let showResult = false;
  let amOwner = false;
  let promise: any = Promise.resolve([]);
  let waiting = true;

  const productInfo = {
    productID: '',
    serialNo: '',
  };

  const checkOwner = async () => {
    const tokenID = productInfo.productID + productInfo.serialNo;
    console.log(tokenID);
    try {
      showResult = true;
      amOwner = await ContractWithSigner.isOwner(tokenID);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleSubmit = () => {
    reset();
    promise = checkOwner().then(() => {
      waiting = false;
    });
  };

  const reset = () => {
    waiting = true;
    showResult = false;
    amOwner = false;
    document.getElementsByClassName('result')[0].classList.remove('owner');
    document.getElementsByClassName('result')[0].classList.remove('not-owner');
  };
</script>

<div class="basicWindow">
  <h1>Am I The Owner</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={handleSubmit}>
      <label for="productID">Product ID</label>
      <input type="text" bind:value={productInfo.productID} />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} />

      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div
  class="result {amOwner ? 'owner' : 'not-owner'} {waiting ? 'waiting' : ''}"
  hidden={!showResult}>
  {#await promise}
    <p>Waiting</p>
  {:then result}
    {#if amOwner}
      <p>You are the owner.</p>
    {:else}
      <p>You are not the owner.</p>
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

  .not-owner {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(252, 0, 0, 1) 0%,
      rgba(249, 53, 34, 1) 100%
    );
  }

  .owner {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(36, 230, 126, 1) 0%,
      rgb(20, 216, 2) 100%
    );
  }
  .waiting {
    background: linear-gradient(
      90deg,
      rgba(55, 36, 230, 1) 0%,
      rgba(0, 105, 255, 1) 100%
    );
  }
</style>
