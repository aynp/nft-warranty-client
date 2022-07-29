<script lang="ts">
  import Contract from '$lib/contract';

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

    for (const item of replaceEvents) {
      const itemBlock = await item.getBlock();
      const itemTime = itemBlock.timestamp;
      services.push({ time: itemTime, type: 'Replace' });
    }

    services.sort((a: any, b: any) => {
      return a.time - b.time;
    });

    services.reverse();

    console.log(services);
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

{#await promise}
  <p>Waiting</p>
{:then result}
  <div>
    {#each services as { time, type }}
      <p>{type}</p>
      <p>{new Date(time)}</p>
    {/each}
  </div>
{/await}
