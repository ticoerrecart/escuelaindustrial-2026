<h1>Bienvenidos al Sitio de Autenticacion.</h1>
<p>Esta es la pagina de inicio. Aqui se puede loguear y se puede acceder a la pagina de administracion.</p>
<p>Si queremos agregar mas usuarios, podemos hacerlo en el archivo 
    <code>usuarios.db</code> que se encuentra en la carpeta <code>src/lib</code>.</p>
<code>
    const hash = await bcrypt.hash("123456", 10);
  await db.execute("INSERT INTO users(email,password,role) VALUES(?,?,?)", [
    "admin@test.com",
    hash,
    "admin",
  ]);
</code>
<br/>
<p>La password se encripta con bcrypt.hash("123456", 10);  Aca podemos cambiar la password por la que queramos.  Tambien debemos cambiar el email, que va ser el usuario que se logueara.</p>
<br/>
<br/>
<br/>
<p>Ver mas informacion del proyecto: <a href="https://docs.google.com/document/d/1G3o50ugAMs5gRX5Otygniwzz-pO3mYVFZxp6xtlMukw/edit?usp=sharing">Svelte-test-login</a></p>
<br/>
<br/>
<br/>
<br/>
<br/>
<a href="/login">Login</a>
