<script>
  import { onMount } from "svelte";
  import api from "./services/api";
  import { user } from "./stores/user";
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import { replace } from "svelte-spa-router";

  onMount(() => {
    user.check();
  });
</script>

<Router {routes} />
