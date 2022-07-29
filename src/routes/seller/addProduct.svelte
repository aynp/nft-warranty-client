<script lang="ts">
  import { ContractWithSigner } from '$lib/contract';
  const product_db = import.meta.env.VITE_BACKEND_API_URL;

  const product = {
    name: '',
    productID: '',
    warrentyPeriod: 0,
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

    const tx = await ContractWithSigner.addProduct(
      product.productID,
      Number(product.warrentyPeriod / (60 * 60 * 24)),
      false
    );
    await tx.wait();
  };
</script>

<div class="basicWindow">
  <h1>Add Product</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={submit}>
      <label for="name">Name</label>
      <input type="text" bind:value={product.name} />

      <label for="productID">Product ID</label>
      <input type="text" bind:value={product.productID} />

      <label for="price">Price</label>
      <input
        type="number"
        bind:value={product.price}
        min="0.00"
        placeholder="0.00"
        step="0.01" />

      <label for="period">Period (in days)</label>
      <input type="text" bind:value={product.warrentyPeriod} />

      <label for="image">Image URL</label>
      <input type="text" bind:value={product.image} />

      <button type="submit">Add User</button>
    </form>
  </div>
</div>
