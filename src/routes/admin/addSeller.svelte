<script lang="ts">
  import { ContractWithSigner } from '$lib/contract';

  let walletAddress = '';
  let promise: any = Promise.resolve([]);
  let showResult = false;
  let waiting = true;
  let added = false;

  const addSeller = async () => {
    console.log(walletAddress);
    try {
      const tx = await ContractWithSigner.addSeller(walletAddress);
      await tx.wait();
      added = true;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleSubmit = () => {
    reset();
    showResult = true;
    promise = addSeller();
  };

  const reset = () => {
    waiting = true;
    added = false;
    showResult = false;
  };
</script>

<div class="basicWindow">
  <h1>Add Seller</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={handleSubmit}>
      <label for="walletAddress">Wallet Address</label>
      <input type="text" bind:value={walletAddress} on:input={reset} />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div
  class="result {waiting ? 'waiting' : ''} {added ? 'added' : ''}"
  hidden={!showResult}>
  {#await promise}
    <p>Adding {walletAddress} as a seller.</p>
  {:then result}
    <p>Address {walletAddress} added as a seller.</p>
  {:catch err}
    <p>Failed to add {walletAddress} as a seller.</p>
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
