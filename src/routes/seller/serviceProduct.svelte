<script lang="ts">
  import { ContractWithSigner } from '$lib/contract';

  let serviceType = 'repair';

  const product = {
    productID: '',
    serialNo: '',
    newSerialNo: '',
  };

  let promise: any = Promise.resolve([]);
  let showResult = false;
  let waiting = true;
  let serviced = false;

  const repair = async () => {
    console.log('Repair', product);
    try {
      const tokenID = product.productID + product.serialNo;

      const repair = await ContractWithSigner.repairProduct(tokenID);
      await repair.wait();
      serviced = true;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const replace = async () => {
    console.log('Replace', product);
    try {
      const tokenID = product.productID + product.serialNo;
      const newTokenID = product.productID + product.newSerialNo;

      const replace = await ContractWithSigner.replaceProduct(
        tokenID,
        newTokenID
      );
      const burnOld = await ContractWithSigner.burn(tokenID);

      await replace.wait();
      await burnOld.wait();
      serviced = true;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleSubmit = () => {
    showResult = true;
    if (serviceType === 'repair') {
      promise = repair();
    } else {
      promise = replace();
    }
  };

  const reset = () => {
    waiting = true;
    serviced = false;
    showResult = false;
  };
</script>

<div class="basicWindow">
  <h1>Service Product</h1>
  <div class="basicBox input">
    <div class="serviceOptions radio-toolbar">
      <input
        type="radio"
        bind:group={serviceType}
        name="serviceType"
        value={'repair'}
        id="radio1" />
      <label for="radio1">Repair</label>

      <input
        type="radio"
        bind:group={serviceType}
        name="serviceType"
        value={'replace'}
        id="radio2" />
      <label for="radio2">Replace</label>
    </div>

    <form on:submit|preventDefault={handleSubmit}>
      <label for="productID">Product ID</label>
      <input type="text" bind:value={product.productID} on:input={reset} />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={product.serialNo} on:input={reset} />

      <div hidden={serviceType == 'repair'}>
        <label for="tokenID">New Serial No</label>
        <input type="text" bind:value={product.newSerialNo} on:input={reset} />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div
  class="result {waiting ? 'waiting' : ''} {serviced ? 'serviced' : ''}"
  hidden={!showResult}>
  {#await promise}
    {#if serviceType == 'repair'}
      <p>Reapiring...</p>
    {:else}
      <p>Replacing...</p>
    {/if}
  {:then result}
    <p>Serviced product having Serial No. {product.serialNo}.</p>
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
  .serviced {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(36, 230, 126, 1) 0%,
      rgb(20, 216, 2) 100%
    );
  }
  .serviceOptions {
    display: flex;
    justify-content: space-around;
  }
  .radio-toolbar input[type='radio'] {
    display: none;
  }

  .radio-toolbar label {
    display: inline-block;
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .radio-toolbar input[type='radio']:checked + label {
    background-color: #488df6;
    color: white;
    border: 1px solid #488df6;
  }
</style>
