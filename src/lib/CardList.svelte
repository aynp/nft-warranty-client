<script lang="ts">
  import Card from './Card.svelte';
  export let dataArray: any[] = [];
</script>

<div class="cards-list">
  {#each dataArray as data}
    <Card {...data} />
  {/each}
</div>

<style>
  .cards-list {
    z-index: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  @media all and (max-width: 500px) {
    .cards-list {
      /* On small screens, we are no longer using row direction but column */
      flex-direction: column;
    }
  }
</style>
