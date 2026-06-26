<script lang="ts">
  import axios from "axios";
  import favicon from "$lib/assets/favicon.svg";
  import { page } from "$app/stores";

  async function logout() {
    await axios.post("/api/logout");
    window.location.href = "/login";
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
      <span>Logged in as {$page.data.user.email}</span>
      <button on:click={logout}>Logout</button>
    {:else}
      <a href="/login">Login</a>
    {/if}
  </nav>
</header>

<main>
  <slot />
</main>
