<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();
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
			<a href="/logout">Logout</a>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</nav>
</header>

<main>
	{@render children()}
</main>
