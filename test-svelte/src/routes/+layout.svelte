<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "bootstrap/dist/css/bootstrap.min.css";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="stylesheet" href="/estilos.css" />
</svelte:head>

<nav class="navbar">
  <ul>
    <li><a href="/">Inicio</a></li>
    <li><a href="ejercicio1">Ejercicio 1</a></li>
    <li><a href="ejercicio2">Ejercicio 2</a></li>
  </ul>
</nav>

{@render children()}
