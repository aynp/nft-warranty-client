<script>
  import Contract from '$lib/contract';

  const productInfo = {
    productID: '',
    serialNo: '',
  };

  const checkOwner = async () => {
    const tokenID = productInfo.productID + productInfo.serialNo;
    try {
      const owner = await Contract.ownerOf(tokenID);
      console.log(owner);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<div class="basicWindow">
  <h1>Track Warranty</h1>
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
