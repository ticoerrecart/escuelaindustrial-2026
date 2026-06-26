<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Administracion</h1>
<p>Esta es la pagina de administracion. Solo los usuarios logueados pueden acceder a esta pagina.</p>
{#if $page.data.user}
	<p>Bienvenido, {$page.data.user.email} ({$page.data.user.role})</p>
{:else}
	<p>No hay usuario logueado.</p>
{/if}
