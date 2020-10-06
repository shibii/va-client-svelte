<script>
  import qs from "qs";
  import { onMount } from "svelte";
  import { location, querystring, push } from "svelte-spa-router";
  import { vacancies } from "../stores/vacancies";
  import Nav from "./nav.svelte";
  import Results from "./results.svelte";

  let terms;

  onMount(() => {
    const parsed = qs.parse($querystring, { ignoreQueryPrefix: true });
    console.log(parsed.terms);
    if (parsed.terms) {
      terms = parsed.terms;
      vacancies.search(parsed.terms);
    } else {
      vacancies.clear();
    }
  });

  const search = () => {
    push("/search?" + qs.stringify({ terms }));
    vacancies.search(terms).catch((err) => push("/login"));
  };
</script>

<p>The current page is: {$location}</p>
<p>The querystring is: {$querystring}</p>

<Nav />

<form on:submit|preventDefault={search}>
  <input type="text" name="search" bind:value={terms} spellcheck="false" />
  <input type="submit" value="search" />
</form>

<Results />
