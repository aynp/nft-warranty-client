<script lang="ts">
  import Card from './Card.svelte';
  async function fetchdata() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    console.log(data);
    if (response.ok) return data;
    else throw new Error('Something went wrong');
  }
</script>

<!-- {#await fetchdata()}
  <p>Awaitinggg</p>
{:then data}
  {#each data.products as product}
    <Card {product} />
  {/each}
{:catch error}
  <p>{error}</p>
{/await} -->
<style>
</style>
