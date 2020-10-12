<script>
  import { onMount } from "svelte";
  import { user } from "./stores/user";
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
</script>

<style>
  #flex-parent {
    display: flex;
  }
  .side {
    flex-shrink: 1;
    flex-grow: 1;
    min-width: 1em;
  }
  #main {
    flex-basis: 800px;
    min-width: 360px;
  }
</style>

<div id="flex-parent">
  <div class="side" />
  <div id="main">
    <Router {routes} />
  </div>
  <div class="side" />
</div>
