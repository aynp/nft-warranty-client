<script>
  import List from '$lib/List.svelte';
  const list = [
    {
      name: 'Add Product',
      imageLink: 'add-product.svg',
      link: 'seller/addProduct',
    },
    {
      name: 'Sell Product',
      imageLink: 'sell-product.svg',
      link: 'seller/sellProduct',
    },
    {
      name: 'Service Product',
      imageLink: 'service-product.svg',
      link: 'seller/serviceProduct',
    },
  ];
</script>

<h1>Seller Panel</h1>

<List {list} />
