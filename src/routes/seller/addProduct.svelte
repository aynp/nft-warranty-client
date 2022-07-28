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

<div class="addProductAll">
  <div>
    <h1>Add Product</h1>
  </div>
  <div class="addProduct input">
    <form on:submit|preventDefault={submit}>
      <label for="name">Name</label>
      <input type="text" bind:value={product.name} /><br />

      <label for="productID">Product ID</label>
      <input type="text" bind:value={product.productID} /><br />

      <label for="price">Price</label>
      <input type="text" bind:value={product.price} /><br />

      <label for="period">Period</label>
      <input type="text" bind:value={product.warrentyPeriod} /> <br />

      <label for="image">Image URL</label>
      <input type="text" bind:value={product.image} /><br />

      <button type="submit">Add User</button>
    </form>
  </div>
</div>

<style>
  .addProductAll {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
  .addProduct {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 10px;
  }
  .input {
    margin: 2rem auto;
    padding: 1rem;
    width: 90%;
    max-width: 40rem;
  }

  .input label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .input input {
    font: inherit;
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    padding: 0.15rem;
    margin-bottom: 0.5rem;
  }

  .input input:focus {
    outline: none;
    border-color: #4f005f;
  }
</style>
