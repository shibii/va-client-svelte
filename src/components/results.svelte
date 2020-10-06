<script>
  import Vacancy from "./vacancy.svelte";
  import More from "./more.svelte";
  import { vacancies } from "../stores/vacancies";
</script>

<div class="list">
  {#each $vacancies as vacancy (vacancy.id)}
    <Vacancy {vacancy} />
  {/each}
</div>
{#if $vacancies.length}
  <More />
{/if}
