<script>
  import { ContractWithSigner } from '$lib/contract';

  const productInfo = {
    ownerWallet: 0,
    productID: 0,
    serialNo: 0,
  };

  const mintNFT = async () => {
    try {
      const tokenID = productInfo.productID + productInfo.serialNo;
      const tx = await ContractWithSigner.mintWarrentyNFT(
        productInfo.ownerWallet,
        productInfo.productID,
        productInfo.serialNo,
        tokenID
      );
      await tx.wait();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<div class="basicWindow">
  <h1>Sell Product</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={mintNFT}>
      <label for="productID">Product ID</label>
      <input type="text" bind:value={productInfo.productID} />
      <br />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} />
      <br />

      <button type="submit">Submit</button>
    </form>
  </div>
</div>
