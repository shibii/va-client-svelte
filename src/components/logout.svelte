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

<button on:click={logout}>logout</button>
