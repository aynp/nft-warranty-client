<script>
  import Contract, { wallet } from '$lib/contract';

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

      const repair = await Contract.repairProduct(tokenID);

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

      const replace = await Contract.replaceProduct(tokenID, newTokenID);
      const burnOld = await Contract._burn(tokenID);

      await replace.wait();
      await burnOld.wait();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<label>
  <input
    type="radio"
    bind:group={serviceType}
    name="serviceType"
    value={'repair'} />
  Repair
</label>

<label>
  <input
    type="radio"
    bind:group={serviceType}
    name="serviceType"
    value={'replace'} />
  Replace
</label>

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
