<script>
  import Contract, { wallet } from '$lib/base';

  const productInfo = {
    productID: 1,
    serialNo: 1,
    tokenID: 1,
  };

  const tokenUri =
    'https://gateway.pinata.cloud/ipfs/QmettvXFnJNcmKngos1wYwohb7LtLB272z5sjzK2Eb5Qwd';

  const mintNFT = async () => {
    console.log(productInfo);
    try {
      const tx = await Contract.mintWarrentyNFT(
        wallet.address,
        productInfo.productID,
        productInfo.serialNo,
        productInfo.tokenID,
        tokenUri,
        {
          nonce: undefined,
          gasLimit: 20000000,
        }
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
