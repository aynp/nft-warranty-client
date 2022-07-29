<script>
  import { ContractWithSigner } from '$lib/contract';

  let serviceType = 'repair';

  const productInfo = {
    productID: 0,
    serialNo: 0,
    newSerialNo: 0,
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
      <br />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} />
      <br />
      <div hidden={serviceType == 'repair'}>
        <label for="tokenID">newSerialNo</label>
        <input type="text" bind:value={productInfo.newSerialNo} />
        <br />
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
    background-color: #ddd;
    padding: 4px 11px;
    font-family: Arial;
    font-size: 16px;
    cursor: pointer;
  }

  .radio-toolbar input[type='radio']:checked + label {
    background-color: #bbb;
  }
</style>
