<script>
  import { ContractWithSigner } from '$lib/contract';

  let serviceType = 'repair';

  const productInfo = {
    productID: '',
    serialNo: '',
    newSerialNo: '',
  };

  const repair = async () => {
    console.log('Repair', productInfo);
    try {
      const tokenID = productInfo.productID + productInfo.serialNo;

      const repair = await ContractWithSigner.repairProduct(tokenID);
      await repair.wait();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const replace = async () => {
    console.log('Replace', productInfo);
    try {
      const tokenID = productInfo.productID + productInfo.serialNo;
      const newTokenID = productInfo.productID + productInfo.newSerialNo;

      const replace = await ContractWithSigner.replaceProduct(
        tokenID,
        newTokenID
      );
      const burnOld = await ContractWithSigner._burn(tokenID);

      await replace.wait();
      await burnOld.wait();
    } catch (error) {
      console.log('ERROR: ', error);
    }
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

    <form on:submit|preventDefault={serviceType == 'repair' ? repair : replace}>
      <label for="productID">Product ID</label>
      <input type="text" bind:value={productInfo.productID} />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} />

      <div hidden={serviceType == 'repair'}>
        <label for="tokenID">New Serial No</label>
        <input type="text" bind:value={productInfo.newSerialNo} />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<style>
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
