<script>
  import Contract, { wallet } from '$lib/contract';

  const productInfo = {
    productID: 0,
    serialNo: 0,
    tokenID: 0,
  };

  const mintNFT = async () => {
    console.log(productInfo);
    try {
      const tx = await Contract.mintWarrentyNFT(
        wallet.address,
        productInfo.productID,
        productInfo.serialNo,
        productInfo.tokenID,
      );
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<form on:submit|preventDefault={mintNFT}>
  <label for="productID">Product ID</label>
  <input type="text" bind:value={productInfo.productID} />
  <br />
  <label for="serialNo">Serial No</label>
  <input type="text" bind:value={productInfo.serialNo} />
  <br />
  <label for="tokenID">Token ID</label>
  <input type="text" bind:value={productInfo.tokenID} />
  <br />
  <button type="submit">Submit</button>
</form>
