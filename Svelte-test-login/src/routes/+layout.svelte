<script lang="ts">
	import axios from 'axios';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();

	async function logout() {
		await axios.post('/api/auth/logout');
		window.location.href = '/login';
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		{#if $page.data.user}
			<a href="/">Home</a>
			<a href="/dashboard">Dashboard</a>
			<a href="/admin">Administracion</a>
			<span>Logueado como {$page.data.user.email}</span>
			<button type="button" onclick={logout}>Logout</button>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</nav>
</header>

<main>
	{@render children()}
</main>
