<script>
  import List from '$lib/List.svelte';
  const list = [
    {
      name: 'Track Warrenty',
      imageLink: 'track.svg',
      link: 'customer/trackWarrenty',
    },
  ];
</script>

<h1>Customer Panel</h1>

<List {list} />
