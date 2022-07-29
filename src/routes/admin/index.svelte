<script>
  import CardList from '$lib/CardList.svelte';
  const data = [
    {
      name: 'Add Admin',
      imageLink: 'purple.jpg',
      link: 'admin/addAdmin',
    },
    {
      name: 'Remove Admin',
      imageLink: 'green.jpg',
      link: 'admin/removeAdmin',
    },
    {
      name: 'Check Admin',
      imageLink: 'blue.jpg',
      link: 'admin/checkAdmin',
    },
    {
      name: 'Add Seller',
      imageLink: 'blue.jpg',
      link: 'admin/addSeller',
    },
  ];
</script>

<h1>Admin Panel</h1>

<CardList dataArray={data} />
