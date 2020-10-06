<script>
  import { onMount } from "svelte";
  import Nav from "./nav.svelte";
  import api from "../services/api";
  import { formatTimestamp } from "../services/util";
  import { user } from "../stores/user";

  let vacancies = [];
  const limit = 20;

  onMount(() => {
    api
      .getHidden({ limit })
      .then((res) => (vacancies = res))
      .catch((err) => user.check());
  });

  const more = () => {
    const offsetId = vacancies[vacancies.length - 1].id;
    api.getHidden({ limit, offsetId }).then((res) => {
      vacancies = [...vacancies, ...res];
    });
  };
</script>

<Nav />

{#each vacancies as vacancy (vacancy.id)}
  <div class="vacancy">
    <p class="ts">{formatTimestamp(vacancy.ts)}</p>
    <a href={vacancy.url}>{vacancy.header}</a>
  </div>
{/each}

{#if vacancies.length}<button class="more" on:click={more}>more</button>{/if}
