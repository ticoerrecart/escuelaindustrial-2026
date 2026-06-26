<script>
  import axios from "axios";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let error = "";

  async function login() {
    error = "";

    const { data } = await axios.post(
      "/api/login",
      { email, password },
      { validateStatus: () => true },
    );
    debugger;
    if (data.error) {
      error = data.error;
      return;
    }

    /*auth.set({
      loading: false,
      user: data.user,
    });*/

    window.location.href = "/dashboard";
  }
</script>

<h1>Login para testear el servicio de autenticacion</h1>

<form on:submit|preventDefault={login}>
  <input bind:value={email} type="email" placeholder="Email" />

  <input bind:value={password} type="password" placeholder="Password" />

  <button type="submit"> Login </button>

  {#if error}
    <p>{error}</p>
  {/if}
</form>
