<script>
  import { onMount } from "svelte";
  import Nav from "./nav.svelte";
  import { replace } from "svelte-spa-router";
  import Results from "./results.svelte";
  import { vacancies } from "../stores/vacancies";

  onMount(() => vacancies.hidden().catch((err) => replace("/login")));
</script>

<Nav />

<Results />
