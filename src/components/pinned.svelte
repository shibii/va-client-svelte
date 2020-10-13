<script>
  import { onMount } from "svelte";
  import Nav from "./nav.svelte";
  import api from "../services/api";
  import { user } from "../stores/user";
  import Vacancy from "./vacancy.svelte";

  let vacancies = [];
  const limit = 20;
  let visibleMore = true;

  onMount(() => {
    api
      .getPinned({ limit })
      .then((res) => (vacancies = res))
      .catch((err) => user.check());
  });

  const unpin = (id) => {
    vacancies = vacancies.filter((vacancy) => vacancy.id !== id);
    api.unpin(id);
  };

  const more = () => {
    visibleMore = false;
    const offsetId = vacancies[vacancies.length - 1].id;
    api.getPinned({ limit, offsetId }).then((res) => {
      vacancies = [...vacancies, ...res];
      visibleMore = true;
    });
  };
</script>

<Nav />

{#each vacancies as vacancy (vacancy.id)}
  <div class="vacancy">
    <Vacancy {vacancy}>
      <button on:click={() => unpin(vacancy.id)}>unpin</button>
    </Vacancy>
  </div>
{/each}

{#if visibleMore && vacancies.length >= limit}
  <button class="more" on:click={more}>more</button>
{/if}
