<script lang="ts">
  import { ContractWithSigner } from '$lib/contract';
  const product_db = import.meta.env.VITE_BACKEND_API_URL;

  const product = {
    name: '',
    productID: '',
    warrentyPeriod: 0,
    isTransferable: true,
    price: '',
    image: '',
  };

  let promise: any = Promise.resolve([]);
  let showResult = false;
  let waiting = true;
  let added = false;

  const addProduct = async () => {
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
      Number(product.warrentyPeriod * (60 * 60 * 24)),
      product.isTransferable
    );
    await tx.wait();
    added = true;
  };

  const handleSubmit = () => {
    showResult = true;
    promise = addProduct();
  };

  const reset = () => {
    waiting = true;
    added = false;
    showResult = false;
  };
</script>

<div class="basicWindow">
  <h1>Add Product</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={handleSubmit}>
      <label for="name">Name</label>
      <input type="text" bind:value={product.name} on:input={reset} />

      <label for="productID">Product ID</label>
      <input type="text" bind:value={product.productID} on:input={reset} />

      <label for="price">Price</label>
      <input
        type="number"
        bind:value={product.price}
        min="0.00"
        placeholder="0.00"
        step="0.01"
        on:input={reset} />

      <label for="period">Period (in days)</label>
      <input type="text" bind:value={product.warrentyPeriod} on:input={reset} />

      <label for="image">Image URL</label>
      <input type="text" bind:value={product.image} on:input={reset} />

      <button type="submit">Add Product</button>
    </form>
  </div>
</div>

<div
  class="result {waiting ? 'waiting' : ''} {added ? 'added' : ''}"
  hidden={!showResult}>
  {#await promise}
    <p>Adding...</p>
  {:then result}
    <p>Product {product.name} was added.</p>
  {:catch err}
    <p>Failed.</p>
  {/await}
</div>

<style>
  .result {
    min-width: 50%;
    text-align: center;
    margin: 20px auto;
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.4s;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 8px;
    font-size: 1.2rem;
  }

  .waiting {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(55, 36, 230, 1) 0%,
      rgba(0, 105, 255, 1) 100%
    );
  }
  .added {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(36, 230, 126, 1) 0%,
      rgb(20, 216, 2) 100%
    );
  }
</style>
