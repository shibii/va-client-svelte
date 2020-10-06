<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import Logout from "./logout.svelte";
</script>

<style>
  nav {
    font-size: 1.2rem;
    text-transform: uppercase;
  }
  a {
    border: 1px solid black;
  }

  nav :global(button) {
    float: right;
  }

  :global(a.active) {
    color: dimgray;
  }
</style>

<nav>
  <a href="/search" use:link use:active>search</a>
  <a href="/hidden" use:link use:active>hidden</a>
  <Logout />
</nav>
