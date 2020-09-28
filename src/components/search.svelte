<script>
  import api from "../services/api";
  import { vacancies } from "../stores/vancancies";

  let terms;

  const search = () => {
    if (terms) {
      api
        .fts({ terms, limit: 20 })
        .then((res) => {
          vacancies.set(res);
        })
        .catch((err) => console.log(err));
    }
  };
</script>

<form on:submit|preventDefault={search}>
  <input type="text" name="search" bind:value={terms} spellcheck="false" />
  <input type="submit" value="search" />
</form>
