<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>Warrenty NFT</title>
  <meta name="description" content="Warrenty NFT Homepage" />
</svelte:head>

<section>
  <h1>HomePage</h1>
  <a href="/admin">Admin Panel</a>
  <a href="/seller">Seller Panel</a>
  <a href="/about">About</a>
</section>

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
