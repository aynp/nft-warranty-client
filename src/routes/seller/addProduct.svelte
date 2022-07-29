<script lang="ts">
  import { ContractWithSigner } from '$lib/contract';
  const product_db = import.meta.env.VITE_BACKEND_API_URL;

  const product = {
    name: '',
    productID: '',
    warrentyPeriod: '',
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
      Number(product.warrentyPeriod),
      false
    );
    await tx.wait();
    console.log(tx);
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
      <input type="text" bind:value={product.price} />

      <label for="period">Period</label>
      <input type="text" bind:value={product.warrentyPeriod} />

      <label for="image">Image URL</label>
      <input type="text" bind:value={product.image} />

      <button type="submit">Add User</button>
    </form>
  </div>
</div>
