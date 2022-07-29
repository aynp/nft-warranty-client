<script>
  import { ContractWithSigner } from '$lib/contract';

  const productInfo = {
    ownerWallet: '',
    productID: '',
    serialNo: '',
  };

  const mintNFT = async () => {
    try {
      const tokenID = productInfo.productID + productInfo.serialNo;
      const tx = await ContractWithSigner.mintWarrentyNFT(
        productInfo.ownerWallet,
        productInfo.productID,
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
      <label for="ownerWallet">Buyers Address</label>
      <input type="text" bind:value={productInfo.ownerWallet} />

      <label for="productID">Product ID</label>
      <input type="text" bind:value={productInfo.productID} />

      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} />

      <button type="submit">Submit</button>
    </form>
  </div>
</div>
