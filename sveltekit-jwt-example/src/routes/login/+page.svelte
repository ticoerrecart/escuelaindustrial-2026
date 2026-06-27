<script>
	import axios from "axios";

	let { data } = $props();

	let email = $state("");
	let password = $state("");
	let error = $state("");

	async function login() {
		error = "";

		const { data: response } = await axios.post(
			"/api/login",
			{ email, password },
			{ validateStatus: () => true },
		);

		if (response.error) {
			error = response.error;
			return;
		}

		if (data.returnTo) {
			const url = new URL(data.returnTo);
			url.searchParams.set("token", response.token);
			window.location.href = url.toString();
			return;
		}

		window.location.href = "/dashboard";
	}
</script>

<h1>Login</h1>

{#if data.returnTo}
	<p>Iniciá sesión para volver a la aplicación que te envió acá.</p>
{/if}

{#if data.returnToError}
	<p>{data.returnToError}</p>
{/if}

<form onsubmit={(e) => { e.preventDefault(); login(); }}>
	<input bind:value={email} type="email" placeholder="Email" required />

	<input bind:value={password} type="password" placeholder="Password" required />

	<button type="submit">Login</button>

	{#if error}
		<p>{error}</p>
	{/if}
</form>
