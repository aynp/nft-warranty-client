<script lang="ts">
  import { ContractWithSigner } from '$lib/contract';

  let walletAddress = '';
  let promise: any = Promise.resolve([]);
  let showResult = false;
  let waiting = true;
  let removed = false;

  const removeAdmin = async () => {
    console.log(walletAddress);
    try {
      const tx = await ContractWithSigner.removeAdmin(walletAddress);
      await tx.wait();
      removed = true;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleSubmit = () => {
    reset();
    showResult = true;
    promise = removeAdmin();
  };

  const reset = () => {
    waiting = true;
    removed = false;
    showResult = false;
  };
</script>

<div class="basicWindow">
  <h1>Remove Admin</h1>
  <div class="basicBox input">
    <form on:submit|preventDefault={handleSubmit}>
      <label for="walletAddress">Wallet Address</label>
      <input type="text" bind:value={walletAddress} on:input={reset} />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<div
  class="result {waiting ? 'waiting' : ''} {removed ? 'removed' : ''}"
  hidden={!showResult}>
  {#await promise}
    <p>Removing {walletAddress} as an admin.</p>
  {:then result}
    <p>Address {walletAddress} was removed as an admin.</p>
  {:catch err}
    <p>Failed to remove {walletAddress} as an admin.</p>
  {/await}
</div>

<style>
  .result {
    color: white;
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
  .removed {
    color: white;
    background: linear-gradient(
      90deg,
      rgba(238, 41, 222, 1) 0%,
      rgba(136, 63, 233, 1) 100%
    );
  }
</style>
