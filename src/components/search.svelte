<script>
  import { parse, stringify } from "qs";
  import { querystring, push } from "svelte-spa-router";
  import api from "../services/api";
  import Nav from "./nav.svelte";
  import { onMount } from "svelte";
  import { user } from "../stores/user";
  import Vacancy from "./vacancy.svelte";

  const limit = 20;
  let visibleMore = true;

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
    visibleMore = false;
    const offsetId = vacancies[vacancies.length - 1].id;
    api.fts({ terms: parsed.terms, limit, offsetId }).then((res) => {
      vacancies = [...vacancies, ...res];
      visibleMore = true;
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

<style>
  form {
    display: flex;
  }
  form > #text {
    flex-grow: 1;
  }
  form > #send {
    width: 80px;
  }
</style>

<Nav />

<form on:submit|preventDefault={search}>
  <input
    id="text"
    type="text"
    name="search"
    bind:value={terms}
    spellcheck="false" />
  <input id="send" type="submit" value="search" />
</form>

<ul>
  {#each vacancies as vacancy (vacancy.id)}
    <li class="vacancy">
      <Vacancy {vacancy}>
        <button on:click={() => hide(vacancy.id)}>hide</button>
        <button on:click={() => pin(vacancy.id)}>pin</button>
      </Vacancy>
    </li>
  {/each}
</ul>

{#if visibleMore && vacancies.length >= limit}
  <button class="more" on:click={more}>more</button>
{/if}
