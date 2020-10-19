<script>
  import { formatTimestamp } from "../services/util";

  export let vacancy;
</script>

<style>
  div {
    margin-top: 1.5em;
  }
  .ts {
    font-size: 0.8rem;
    color: var(--light-gray);
    margin: 0;
  }
  strong {
    color: var(--theme6);
  }
</style>

<div>
  <p class="ts">
    {formatTimestamp(vacancy.ts)}
    &middot;
    <strong>{vacancy.source}</strong>
  </p>
  <a href={vacancy.url}>{vacancy.header}</a>
  <slot />
</div>
