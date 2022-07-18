<script>
  export let product;
</script>

<div class="card">
  <div>{product.title}</div>
  <img src={product.images[0]} alt={product.title} />
</div>
