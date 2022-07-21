<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Contract, { wallet } from '../lib/base';

  const tokenUri =
    'https://gateway.pinata.cloud/ipfs/QmettvXFnJNcmKngos1wYwohb7LtLB272z5sjzK2Eb5Qwd';

  const logName = async () => {
    const name = await Contract.name();
    console.log(name);
    return name;
  };

  const mintNFT = async () => {
    const tx = await Contract.mintWarrentyNFT(
      wallet.address,
      1,
      1,
      1,
      tokenUri
    );
    await tx.wait();
    console.log(tx);
  };
</script>

<button on:click={logName}>LOG NAME</button>

<svelte:head>
  <title>Warrenty NFT</title>
  <meta name="description" content="Warrenty NFT Homepage" />
</svelte:head>

<section>
  <h1>HomePage</h1>
  <a href="/admin">Admin Panel</a>
  <a href="/seller">Seller Panel</a>
  <a href="/about">About</a>

  <button on:click={mintNFT}>MINT</button>
</section>

<!-- {#await logName()}
  <p>Waiting</p>
{:then name}
  <p>Done, {name}</p>
{/await} -->
<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }
</style>
