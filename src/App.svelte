<script>
  import { onMount } from "svelte";
  import { user } from "./stores/user";
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
</script>

<Router {routes} />
