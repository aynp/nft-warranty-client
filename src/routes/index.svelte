<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import CardList from '$lib/CardList.svelte';

  const data = [
    {
      name: 'Admin Panel',
      imageLink: 'purple.jpg',
      link: '/admin',
    },
    {
      name: 'Seller Panel',
      imageLink: 'blue.jpg',
      link: '/seller',
    },
    {
      name: 'Customer Panel',
      imageLink: 'green.jpg',
      link: '/customer',
    },
  ];
</script>

<svelte:head>
  <title>Warrenty NFT</title>
  <meta name="description" content="Warrenty NFT Homepage" />
</svelte:head>

<h1>HomePage</h1>

<CardList dataArray={data} />

<style>
  h1 {
    width: 100%;
  }
</style>
