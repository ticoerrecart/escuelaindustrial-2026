<script>
	import { onMount } from 'svelte';

	let products = [];

	let name = '';
	let price = '';
	let stock = '';
	let imageFile = null;

	async function loadProducts() {
		const res = await fetch('/productos');
		products = await res.json();
	}

	async function addProduct() {
		// Always send multipart/form-data
		const fd = new FormData();
		fd.append('name', name);
		fd.append('price', String(price));
		fd.append('stock', String(stock));
		if (imageFile) fd.append('image', imageFile);
		await fetch('/productos', {
			method: 'POST',
			body: fd
		});

		name = '';
		price = '';
		stock = '';
		imageFile = null;

		await loadProducts();
	}

	onMount(async () => {
		await loadProducts();
	});

	async function uploadImage(id, file) {
		if (!file) return;
		const fd = new FormData();
		fd.append('id', id);
		fd.append('image', file);

		await fetch('/productos', {
			method: 'PUT',
			body: fd
		});

		await loadProducts();
	}
</script>

<h1>Tienda de Mascotas</h1>

<div class="form">
	<input bind:value={name} placeholder="Producto" />
	<input bind:value={price} type="number" placeholder="Precio" />
	<input bind:value={stock} type="number" placeholder="Stock" />
	<input type="file" accept="image/*" on:change={(e) => (imageFile = e.target.files[0])} />

	<button on:click={addProduct}> Agregar </button>
</div>

<h2>Productos</h2>

{#each products as product}
	<div class="card">
		{#if product.image_data}
			<img
				class="prod-img"
				src={`data:${product.image_mime};base64,${product.image_data}`}
				alt={product.name}
			/>
		{/if}
		<h3>{product.name}</h3>
		<p>Precio: ${product.price}</p>
		<p>Stock: {product.stock}</p>
		<div class="edit-image">
			<input
				type="file"
				accept="image/*"
				on:change={(e) => uploadImage(product.id, e.target.files[0])}
			/>
		</div>
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
		display: flex;
		gap: 10px;
	}

	.prod-img {
		width: 96px;
		height: 96px;
		object-fit: cover;
		border-radius: 6px;
	}

	.edit-image {
		display: flex;
		align-items: center;
	}
</style>
