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
    cursor: pointer;
    transition: 0.4s;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 8px;
    transition: all 0.5s ease-in-out;
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
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: -80px;
    height: 40px;
    color: white;
  }

  .card:hover {
    transform: scale(1.01, 1.01);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 10px;
  }
</style>
