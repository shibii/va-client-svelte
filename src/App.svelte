<script>
  import { onMount } from "svelte";
  import Login from "./components/login.svelte";
  import Search from "./components/search.svelte";
  import Vacancy from "./components/vacancy.svelte";
  import api from "./services/api";
  import { vacancies } from "./stores/vancancies";
  import { user } from "./stores/user";

  onMount(() => {
    api
      .me()
      .then((res) => {
        user.set(res);
      })
      .catch((err) => {
        user.set(null);
      });
  });
</script>

{#if !$user}
  <Login />
{:else}
  <Search />

  {#each $vacancies as vacancy (vacancy.id)}
    <Vacancy {vacancy} />
  {/each}
{/if}
