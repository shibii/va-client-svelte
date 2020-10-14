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
  div {
    display: flex;
    justify-content: space-between;
  }

  a {
    flex-grow: 1;
    text-align: center;
    background-color: var(--theme2);
    color: var(--theme6);
    text-decoration: unset;
  }

  :global(a.active) {
    background-color: var(--theme6);
    color: var(--theme1);
  }
</style>

<div>
  <a href="/search" use:link use:active={{ path: /\/search/ }}>search</a>
  <a href="/hidden" use:link use:active>hidden</a>
  <a href="/pinned" use:link use:active>pinned</a>
</div>
