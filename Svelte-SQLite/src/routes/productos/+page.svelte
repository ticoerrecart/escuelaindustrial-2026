<script>
	import { onMount } from 'svelte';

	let products = [];

	let name = '';
	let price = '';
	let stock = '';

	async function loadProducts() {
		const res = await fetch('/productos');
		products = await res.json();
	}

	async function addProduct() {
		await fetch('/productos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				price: Number(price),
				stock: Number(stock)
			})
		});

		name = '';
		price = '';
		stock = '';

		await loadProducts();
	}

	onMount(async () => {
		await loadProducts();
	});
</script>

<h1>Tienda de Mascotas</h1>

<div class="form">
	<input bind:value={name} placeholder="Producto" />
	<input bind:value={price} type="number" placeholder="Precio" />
	<input bind:value={stock} type="number" placeholder="Stock" />

	<button on:click={addProduct}> Agregar </button>
</div>

<h2>Productos</h2>

{#each products as product}
	<div class="card">
		<h3>{product.name}</h3>
		<p>Precio: ${product.price}</p>
		<p>Stock: {product.stock}</p>
	</div>
{/each}

<style>
	h1 {
		margin-bottom: 20px;
	}

	.form {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
	}

	input {
		padding: 8px;
	}

	button {
		padding: 8px 16px;
	}

	.card {
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
		border-radius: 8px;
	}
</style>
