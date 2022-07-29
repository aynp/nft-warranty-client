<header />

<slot />

<footer>
  <a href="/">HOME</a>
</footer>

<style>
  header {
    height: 10px;
    text-align: center;
    background-color: blue;
    background: linear-gradient(
      90deg,
      hsla(217, 100%, 50%, 1) 0%,
      hsla(193, 100%, 54%, 1) 100%
    );
  }
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
  }
</style>
