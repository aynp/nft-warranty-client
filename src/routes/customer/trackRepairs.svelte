<script lang="ts">
  import Contract from '$lib/contract';
  import ListItem from '$lib/ListItem.svelte';

  const productInfo = {
    productID: '',
    serialNo: '',
  };

  let promise: any = Promise.resolve([]);

  let services: any = [];

  const getEvents = async () => {
    const tokenID = productInfo.productID + productInfo.serialNo;
    const repairFiler = Contract.filters.Repair(tokenID);
    const replaceFiler = Contract.filters.Replace(tokenID);

    const repairEvents = await Contract.queryFilter(repairFiler);
    const replaceEvents = await Contract.queryFilter(replaceFiler);

    for (const item of repairEvents) {
      const itemBlock = await item.getBlock();
      const itemTime = itemBlock.timestamp;
      services.push({ time: itemTime, type: 'Repair' });
    }

    const itemBlock = await replaceEvents[0].getBlock();
    const itemTime = itemBlock.timestamp;
    services.push({ time: itemTime, type: 'Replace' });

    services.sort((a: any, b: any) => {
      return a.time - b.time;
    });

    services.reverse();

    console.log(services.length);
  };

  const handleClick = () => {
    promise = getEvents();
  };
</script>

<div class="basicWindow">
  <h1>Track Repairs</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={handleClick}>
      <label for="productID">Product ID</label>
      <input type="text" bind:value={productInfo.productID} />
      <label for="serialNo">Serial No</label>
      <input type="text" bind:value={productInfo.serialNo} />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div class="result">
  {#await promise}
    <p>Waiting</p>
  {:then result}
    <div>
      {#if services.length == 0}
        <p>No Repairs</p>
      {:else}
        {#each services as { time, type }}
          <div class="item">
            <p>
              {type} -
              {new Date(time * 1000).getDate()},
              {new Date(time * 1000).getMonth()},
              {new Date(time * 1000).getFullYear()}
            </p>
          </div>
        {/each}
      {/if}
    </div>
  {/await}
</div>

<style>
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .item {
    color: white;
    font-size: 1rem;
    background-color: #4b91f7;
    margin: 10px;
    padding: 1rem 5rem;
    border-radius: 0.5rem;
  }
</style>
