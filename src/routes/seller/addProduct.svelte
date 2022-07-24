<script lang="ts">
  const product_db = import.meta.env.VITE_BACKEND_API_URL;

  const product = {
    name: '',
    productID: '',
    price: '',
    image: '',
  };

  const submit = async () => {
    console.log(product);
    fetch(`${product_db}/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
</script>

<form on:submit|preventDefault={submit}>
  <label for="name">Name</label>
  <input type="text" bind:value={product.name} /><br />

  <label for="productID">Product ID</label>
  <input type="text" bind:value={product.productID} /><br />

  <label for="price">Price</label>
  <input type="text" bind:value={product.price} /><br />

  <label for="image">Image URL</label>
  <input type="text" bind:value={product.image} /><br />

  <input type="submit" value="Submit" />
</form>
