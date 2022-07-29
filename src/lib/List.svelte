<script lang="ts">
  import ListItem from './ListItem.svelte';
  export let list: any[] = [];
</script>

<div class="list-container">
  {#each list as item}
    <ListItem {...item} />
  {/each}
</div>

<style>
  .list-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>
