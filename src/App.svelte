<script>
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import Nav from "./components/nav.svelte";
  import Header from "./components/header.svelte";
  import About from "./components/about.svelte";
  import Footer from "./components/footer.svelte";
  import Topbar from "./components/topbar.svelte";
</script>

<style>
  .layout {
    margin: 1em;
  }
</style>

<div class="layout">
  <Topbar />

  <Header />

  <About />

  <Nav />

  <Router {routes} />

  <Footer />
</div>
