<script>
  import { vacancies } from "../stores/vacancies";
  import {
    parse,
    format,
    formatDistanceToNow,
    differenceInDays,
  } from "date-fns";

  export let vacancy;
  const { id, url, header, source, ts } = vacancy;

  let time = parse(
    // remove millisecond suffix
    vacancy.ts.replace(/\.[^.]*$/, ""),
    "yyyy-MM-dd HH:mm:ss",
    new Date()
  );

  if (differenceInDays(new Date(), time) < 4) {
    time = formatDistanceToNow(time, { addSuffix: true });
  } else {
    time = format(time, "d/M/Y");
  }
</script>

<div class="card">
  <p>{time}</p>
  <a href={vacancy.url}> {vacancy.header} </a>
  <button on:click={() => vacancies.hide(id)}>hide</button>
</div>
