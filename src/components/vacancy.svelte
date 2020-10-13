<script>
  import { formatTimestamp } from "../services/util";

  export let vacancy;
</script>

<style>
  .ts {
    font-size: 0.8rem;
    color: var(--light-gray);
    margin-bottom: 0;
  }
</style>

<p class="ts">{formatTimestamp(vacancy.ts)}</p>
<a href={vacancy.url}>{vacancy.header}</a>
<slot />
