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
  nav {
    display: flex;
    margin: 1em 0;
  }

  nav > a {
    display: block;
  }

  nav > a + a {
    margin-left: 1em;
  }

  nav > .nav-right {
    margin-left: auto;
  }

  :global(a.active) {
    color: dimgray;
  }
</style>

<nav>
  <a href="/search" use:link use:active={{ path: /\/search/ }}>search</a>
  <a href="/hidden" use:link use:active>hidden</a>
  <a href="/pinned" use:link use:active>pinned</a>
  <a class="nav-right" href="/" on:click={logout}>logout</a>
</nav>
