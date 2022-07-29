<script lang="ts">
  import '../app.css';
</script>

<main>
  <slot />
</main>

<footer>
  <p>by <a href="/about">no_AC</a>.</p>
</footer>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    padding-top: 0;
  }

  footer a {
    font-weight: bold;
  }
</style>
