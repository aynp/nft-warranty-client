<script lang="ts">
  import Contract, { wallet } from '../../lib/base';

  let address: string = '';

  const isAdmin = async () => {
    const result = await Contract.isAdmin(address);
    console.log(result);
  };
</script>

<form on:submit|preventDefault={isAdmin}>
  <label for="name">Address</label>
  <input type="text" bind:value={address} />
  <button type="submit">Submit</button>
</form>
