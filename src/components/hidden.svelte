<script>
  import { onMount } from "svelte";
  import Nav from "./nav.svelte";
  import api from "../services/api";
  import { formatTimestamp } from "../services/util";
  import { user } from "../stores/user";

  let vacancies = [];
  const limit = 20;
  let visibleMore = true;

  onMount(() => {
    api
      .getHidden({ limit })
      .then((res) => (vacancies = res))
      .catch((err) => user.check());
  });

  const unhide = (id) => {
    vacancies = vacancies.filter((vacancy) => vacancy.id !== id);
    api.unhide(id);
  };

  const more = () => {
    visibleMore = false;
    const offsetId = vacancies[vacancies.length - 1].id;
    api.getHidden({ limit, offsetId }).then((res) => {
      vacancies = [...vacancies, ...res];
      visibleMore = true;
    });
  };
</script>

<Nav />

<ul>
  {#each vacancies as vacancy (vacancy.id)}
    <li class="vacancy">
      <p class="ts">{formatTimestamp(vacancy.ts)}</p>
      <a href={vacancy.url}>{vacancy.header}</a>
      <button on:click={() => unhide(vacancy.id)}>unhide</button>
    </li>
  {/each}
</ul>

{#if visibleMore && vacancies.length >= limit}
  <button class="more" on:click={more}>more</button>
{/if}
