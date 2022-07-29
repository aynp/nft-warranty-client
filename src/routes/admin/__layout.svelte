<header />

<slot />

<footer>
  <a href="/">HOME</a>
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
  }
  header {
    height: 10px;
    text-align: center;
    background-color: blue;
    background: linear-gradient(
      90deg,
      hsla(50, 92%, 70%, 1) 0%,
      hsla(335, 100%, 69%, 1) 100%,
      hsla(252, 89%, 78%, 1) 100%
    );
  }
</style>
