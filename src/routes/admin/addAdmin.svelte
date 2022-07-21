<script>
  const user = {
    name: '',
    email: '',
    phone: '',
  };
  const submit = () => {
    console.log(user);
  };
</script>

<form on:submit|preventDefault={submit}>
  <label for="name">Name</label>
  <input type="text" bind:value={user.name} />
  <label for="email">E-mail</label>
  <input type="text" bind:value={user.email} />
  <label for="phone">Phone</label>
  <input type="text" bind:value={user.phone} />
  <button type="submit">Submit</button>
</form>
