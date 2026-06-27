<h1>Bienvenido a Svelte-test-login</h1>
<h3>
	Esta app usa <strong>sveltekit-jwt-example</strong> como servicio de autenticacion.
	El login y logout se realizan en ese proyecto.
</h3>

<table border="1">
	<thead>
		<tr style="background-color: #f0f0f0; font-weight: bold;">
			<td>Archivos necesarios para la autenticacion</td>
			<td>Descripción</td>
			<td>Acciones</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>.env</td>
			<td>Variables de entorno</td>
			<td>
				<strong>Editar en el archivo:</strong>
				<br /><br />
				<code>PUBLIC_AUTH_API_URL</code> — URL del servicio de autenticacion. ej: http://localhost:5174
				<br /><br />
				La URL de esta app se detecta automaticamente desde cada request (<code>event.url.origin</code>).
				<br /><br />
				<code>PROTECTED_ROUTES</code> — rutas protegidas, separadas por comas. ej: /dashboard,/admin
			</td>
		</tr>
		<tr>
			<td>hooks.server.ts</td>
			<td>Toda la logica de auth del cliente</td>
			<td>/login, /auth/callback, /logout y rutas protegidas</td>
		</tr>
		<tr>
			<td>src/routes/+layout.server.ts</td>
			<td>Provee el estado de autenticacion a la raiz de la app</td>
			<td></td>
		</tr>
		<tr style="background-color: #f0f0f0; font-weight: bold;">
			<td>Otros archivos</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>src/routes/admin/, src/routes/dashboard</td>
			<td>Paginas del proyecto</td>
			<td>Deben estar listadas en PROTECTED_ROUTES del .env</td>
		</tr>
	</tbody>
</table>

<p><a href="/login">Ir al login</a></p>
