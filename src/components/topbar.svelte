<script>
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
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  a {
    display: block;
    margin: 0;
    padding: 0;
    background-color: var(--theme2);
    color: var(--theme6);
    text-decoration: unset;
    padding: 0 1em;
  }
</style>

<div><a class="nav-right" href="/login" on:click={logout}>logout</a></div>
