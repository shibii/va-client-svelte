<script>
  import { replace } from "svelte-spa-router";
  import { vacancies } from "../stores/vacancies";

  const more = () => {
    vacancies.more().catch((err) => replace("/login"));
  };
</script>

<button on:click={more}>more</button>
