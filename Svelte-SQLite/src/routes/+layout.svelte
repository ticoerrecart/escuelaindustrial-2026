<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	//importamos css de bootstrap
	import 'bootstrap/dist/css/bootstrap.min.css';

	onMount(async () => {
		// Safe dynamic import
		//importamos js de bootstrap
		await import('bootstrap/dist/js/bootstrap.bundle.min.js');
	});

	// Función para verificar si un enlace es el activo
	function isActive(href) {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
</script>

<div class="container">
	<nav class="navbar bg-body-tertiary">
		<div class="container">
			<a class="navbar-brand" class:active={isActive('/')} href="/"> Inicio </a>

			<a class="navbar-brand" class:active={isActive('/productos')} href="/productos">
				Productos
			</a>

			<a class="navbar-brand" class:active={isActive('/proveedores')} href="/proveedores">
				Proveedores
			</a>

			<a class="navbar-brand" class:active={isActive('/clientes')} href="/clientes"> Clientes </a>
		</div>
	</nav>
	<br />

	<!-- ¡Esto es esencial! -->
	<slot />

	<!-- ¡Esto es esencial! -->
</div>

<style>
	:global(.navbar-brand.active) {
		color: #0d6efd !important;
		font-weight: bold;
		border: 2px solid #0d6efd;
		border-radius: 5px;
		padding: 8px 12px;
	}
</style>
