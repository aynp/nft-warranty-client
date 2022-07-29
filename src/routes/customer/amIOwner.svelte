<script>
  import Contract, { ContractWithSigner } from '$lib/contract';

  let amOwner = false;

  const productInfo = {
    productID: '',
    serialNo: '',
  };

  const checkOwner = async () => {
    const tokenID = productInfo.productID + productInfo.serialNo;
    console.log(tokenID);
    try {
      amOwner = await ContractWithSigner.isOwner(tokenID);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<div class="basicWindow">
  <h1>Am I The Owner</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={checkOwner}>
      <label for="productID">Product ID</label>
      <input type="text" bind:value={productInfo.productID} />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} />

      <button type="submit">Submit</button>
    </form>
  </div>
</div>
