<script>
  import Contract from '$lib/contract';

  const productInfo = {
    productID: 0,
    serialNo: 0,
  };

  let showResult = false;
  let remainingTime = 0;

  let sellTime = 0;

  const trackWarranty = async () => {
    const tokenID = productInfo.productID + productInfo.serialNo;
    try {
      sellTime = await Contract.issueTime(tokenID);
      const warrantyDuration = await Contract.warrantyPeriod(tokenID);

      console.log(sellTime, warrantyDuration);

      showResult = true;

      const warrantyEnd = Number(sellTime) + Number(warrantyDuration);
      const currentTime = new Date().getTime() / 1000;

      remainingTime = +warrantyEnd - +currentTime;

      console.log(currentTime, warrantyEnd, remainingTime);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<div class="basicWindow">
  <h1>Track Warranty</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={trackWarranty}>
      <label for="productID">Product ID</label>
      <input type="text" bind:value={productInfo.productID} />
      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div class="result" hidden={!showResult}>
  {#if remainingTime > 0}
    <p>In Warranty</p>
    {sellTime}
    <p>{new Date(sellTime * 1000)}</p>
    <p>
      Remaining Time = {Math.floor(remainingTime / (24 * 60 * 60 * 1000))} Days
    </p>
  {:else}
    Out of Warranty
  {/if}
</div>
