<script>
  export let name = 'Place Holder';
  export let imageLink = '';
  export let link = '';
</script>

<a href={link}>
  <div class="panelLink">
    <div class="card 1">
      <div class="card_image">
        <img src={imageLink} alt="" />
      </div>
      <div class="card_title">
        <p>{name}</p>
      </div>
    </div>
  </div>
</a>

<style>
  a:hover {
    text-decoration: none;
  }

  .card {
    margin: 30px auto;
    width: 250px;
    height: 250px;
    border-radius: 40px;
    box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
      -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
    cursor: pointer;
    transition: 0.4s;
  }

  .card .card_image {
    width: inherit;
    height: inherit;
    border-radius: 40px;
  }

  .card .card_image img {
    width: inherit;
    height: inherit;
    border-radius: 40px;
    object-fit: cover;
  }

  .card .card_title {
    text-align: center;
    border-radius: 0px 0px 40px 40px;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: -80px;
    height: 40px;
    color: white;
  }

  .card:hover {
    /* transform: scale(0.9, 0.9); */
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
      -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
  }
</style>
