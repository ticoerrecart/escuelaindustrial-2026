<script>
  let { mensaje, color = "black", imagen = "image.png" } = $props();

  const hiceClick = () => {
    alert("Hiciste click en " + mensaje);
  };
</script>

<p style="color: {color};" onclick={hiceClick}>{mensaje}</p>
<img src={imagen} alt="Logo de Svelte" width="100" />
