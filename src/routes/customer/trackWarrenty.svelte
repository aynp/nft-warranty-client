<script>
  import Contract from '$lib/contract';

  const productInfo = {
    productID: 0,
    serialNo: 0,
  };

  let showResult = false;
  let remainingTime = 0;

  const trackWarrenty = async () => {
    const tokenID = productInfo.productID + productInfo.serialNo;
    try {
      const sellTime = await Contract.issueTime(tokenID);
      const warrentyDuration = await Contract.warrentyPeriod(tokenID);

      console.log(sellTime, warrentyDuration);

      showResult = true;

      const warrentyEnd = sellTime + warrentyDuration;
      const currentTime = new Date().getTime();

      remainingTime = warrentyEnd - currentTime;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
</script>

<div class="basicWindow">
  <h1>Track Warrenty</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={trackWarrenty}>
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

<div class="result" hidden={!showResult}>
  {#if remainingTime > 0}
    <p>In Warrenty</p>
    <p>
      Remaining Time = {remainingTime / (24 * 60 * 60)} Days
    </p>
  {:else}
    Out of warrenty
  {/if}
</div>
