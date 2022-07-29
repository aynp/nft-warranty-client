<script>
  import List from '$lib/List.svelte';
  const list = [
    {
      name: 'Track Warrenty',
      imageLink: 'track.svg',
      link: 'customer/trackWarrenty',
    },
    {
      name: 'Am I the Owner',
      imageLink: 'own-warrenty.svg',
      link: 'customer/amIOwner',
    },
    {
      name: 'Track Repairs',
      imageLink: 'track-repairs.svg',
      link: 'customer/trackRepairs',
    },
    {
      name: 'Transfer Product',
      imageLink: 'transfer.svg',
      link: 'customer/transferProduct',
    },
  ];
</script>

<h1>Customer Panel</h1>

<List {list} />
