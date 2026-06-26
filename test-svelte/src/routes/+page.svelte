<script>
  import Componente1 from "../componentes/Componente1.svelte";

  const nombre = "Holaaaaaaaaaaaaa";

  let nombreIngresado = $state("Tico");

  const verificarNombreIngresado = () => {
    //console.log("Nombre ingresado:", nombreIngresado);
    if (nombreIngresado.length === 0) {
      alert("Por favor, ingresa un nombre.");
      return;
    }
    alert("El nombre ingresado es: " + nombreIngresado);
  };
</script>

<h1>Bienvenido a Svelte</h1>
<p>{nombre} Mundo!!!</p>

<br />
<br />

<Componente1 mensaje="Juan" color="blue" />
<Componente1 mensaje="Pedro" imagen="image2.png" />

<br />
<br />

<input
  type="text"
  placeholder="Ingrese un nombre"
  bind:value={nombreIngresado}
/>

<input
  type="button"
  value="Mostrar nombre"
  onclick={verificarNombreIngresado}
/>
