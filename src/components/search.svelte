<script>
  import { parse, stringify } from "qs";
  import { querystring, push, replace } from "svelte-spa-router";
  import api from "../services/api";
  import Nav from "./nav.svelte";
  import { formatTimestamp } from "../services/util";
  import { onMount } from "svelte";
  import { user } from "../stores/user";

  const limit = 20;

  let vacancies = [];
  let terms;
  $: parsed = parse($querystring, { ignoreQueryPrefix: true });
  $: {
    if (parsed.terms)
      api
        .fts({ terms: parsed.terms, limit })
        .then((res) => (vacancies = res))
        .catch((err) => user.check());
  }

  onMount(() => {
    user.check();
  });

  const search = () => {
    push("/search?" + stringify({ terms }));
  };
  const more = () => {
    const offsetId = vacancies[vacancies.length - 1].id;
    api.fts({ terms: parsed.terms, limit, offsetId }).then((res) => {
      vacancies = [...vacancies, ...res];
    });
  };
  const hide = (id) => {
    vacancies = vacancies.filter((vacancy) => vacancy.id !== id);
    api.hide(id);
  };
  const pin = (id) => {
    vacancies = vacancies.filter((vacancy) => vacancy.id !== id);
    api.pin(id);
  };
</script>

<Nav />

<form on:submit|preventDefault={search}>
  <input type="text" name="search" bind:value={terms} spellcheck="false" />
  <input type="submit" value="search" />
</form>

{#each vacancies as vacancy (vacancy.id)}
  <div class="vacancy">
    <p class="ts">{formatTimestamp(vacancy.ts)}</p>
    <a href={vacancy.url}>{vacancy.header}</a>
    <button on:click={() => hide(vacancy.id)}>hide</button>
    <button on:click={() => pin(vacancy.id)}>pin</button>
  </div>
{/each}

{#if vacancies.length >= limit}
  <button class="more" on:click={more}>more</button>
{/if}
