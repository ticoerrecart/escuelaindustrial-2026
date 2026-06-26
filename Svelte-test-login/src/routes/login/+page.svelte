<script lang="ts">
	import axios from 'axios';

	let email = $state('');
	let password = $state('');
	let error = $state('');

	async function login() {
		error = '';

		const { data, status } = await axios.post(
			'/api/auth/login',
			{ email, password },
			{ validateStatus: () => true }
		);

		if (status !== 200 || data.error) {
			error = data.error ?? 'Login failed.  Verifique las credenciales y que el servicio de autenticacion este ejecutandose.';
			return;
		}

		window.location.href = '/dashboard';
	}
</script>

<h1>Login</h1>

<form onsubmit={(e) => { e.preventDefault(); login(); }}>
	<input bind:value={email} type="email" placeholder="Email" required />

	<input bind:value={password} type="password" placeholder="Password" required />

	<button type="submit">Login</button>

	{#if error}
		<p>{error}</p>
	{/if}
</form>
