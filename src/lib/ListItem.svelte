<script>
  export let name = 'Place Holder';
  export let imageLink = '';
  export let link = '';
</script>

<a href={link}>
  <div class="list-item">
    <img src={imageLink} alt="" />
    <span>
      {name}
    </span>
  </div>
</a>

<style>
  .list-item {
    color: black;
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 8px;
    transition: all 0.5s ease-in-out;
  }

  .list-item:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 10px;
  }

  .list-item:active {
    background-color: blue;
  }

  .list-item img {
    width: 2rem;
  }

  .list-item span {
    font-size: 1.25rem;
    margin-left: 1rem;
    font-weight: 700;
  }

  a {
    text-decoration: none;
  }
</style>
