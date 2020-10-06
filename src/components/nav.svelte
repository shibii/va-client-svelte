<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import { replace } from "svelte-spa-router";
  import { user } from "../stores/user";
  import api from "../services/api";

  const logout = () => {
    api.logout().then(() => {
      user.set(null);
      replace("/login");
    });
  };
</script>

<style>
  :global(a.active) {
    color: dimgray;
  }
</style>

<nav>
  <a href="/search" use:link use:active>search</a>
  <a href="/hidden" use:link use:active>hidden</a>
  <a class="logout" href="/" on:click={logout}>logout</a>
</nav>
