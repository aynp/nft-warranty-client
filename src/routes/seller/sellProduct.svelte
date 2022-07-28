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

<form on:submit|preventDefault={mintNFT}>
  <label for="ownerWallet">Owner Wallet Address</label>
  <input type="text" bind:value={productInfo.ownerWallet} />
  <br />

  <label for="productID">Product ID</label>
  <input type="text" bind:value={productInfo.productID} />
  <br />

  <label for="serialNo">Serial No</label>
  <input type="text" bind:value={productInfo.serialNo} />
  <br />

  <button type="submit">Submit</button>
</form>
