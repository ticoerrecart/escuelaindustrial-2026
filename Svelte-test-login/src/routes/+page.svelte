<h1>Bienvenido a Svelte-test-login</h1>
<h3>
    Esta app usa <strong>sveltekit-jwt-example</strong> como servicio de autenticacion.
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
                <br/>
                <br/>
                <code>PUBLIC_AUTH_API_URL</code> para que apunte a la URL
                del servicio de autenticacion. ej: http://localhost:5174
                <br/>
                <br/>
                <code>PROTECTED_ROUTES</code> para que apunte a las rutas protegidas, separadas por comas.
                ej: /dashboard,/admin

            </td>
            </tr>
        <tr>
            <td>src/routes/+layout.svelte</td>
            <td>Archivo de layout</td>
            <td>
                Aqui se puede agregar el menu de navegacion.  Se puede agregar el usuario logueado y el boton de logout.
            </td>
        </tr>
        <tr>
            <td>src/routes/+layout.server.ts</td>
            <td>Archivo que inyecta el usuario logueado en la pagina de cada ruta</td>
            <td>
                
            </td>
        </tr>
        <tr>
            <td>src/routes/login/+page.svelte</td>
            <td>Archivo de la pagina de login</td>
            <td>
                Aqui se define el formulario de login, y se llama al servicio de autenticacion (definido en el otro proyecto) para verificar las credenciales.
            </td>
        </tr>
        <tr>
            <td>hooks.server.ts</td>
            <td>Archivo donde se filtra cada llamado a una ruta protegida</td>
            <td>
                Si el usuario no esta logueado, se redirige a la pagina de login.
                Si el usuario esta logueado, se permite el acceso a la ruta.
                Si el usuario no tiene permisos para acceder a la ruta, se redirige a la pagina de acceso denegado.
            </td>
        </tr>
        <tr>
            <td>api/auth/login/+server.ts</td>
            <td>Archivo donde se redirige al servicio de autenticacion para verificar las credenciales</td>
            <td>
               
            </td>
        </tr>
        <tr>
            <td>api/auth/logout/+server.ts</td>
            <td>Archivo donde se elimina el token de autenticacion</td>
            <td>
               
            </td>
        </tr>
        <tr style="background-color: #f0f0f0; font-weight: bold;">
            <td>Otros archivos (no necesarios para la autenticacion)</td>
            <td>&nbsp;</td>
            <td>&nbsp;
            </td>
        </tr>
        <tr>
            <td>src/routes/admin/, src/routes/dashboard</td>
            <td>Archivo del proyecto en si</td>
            <td>
                Recordar que las paginas de nuestro proyecto que necesitemos que esten protegidas, deben estar en la lista de rutas protegidas en el archivo .env.
            </td>
        </tr>
        
    </tbody>
</table>

<p><a href="/login">Ir al login</a></p>
