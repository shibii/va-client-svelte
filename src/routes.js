import Search from "./components/search.svelte";
import Login from "./components/login.svelte";
import Signup from "./components/signup.svelte";
import Hidden from "./components/hidden.svelte";
import Pinned from "./components/pinned.svelte";

export const routes = {
  "/login": Login,
  "/signup": Signup,
  "/search": Search,
  "/hidden": Hidden,
  "/pinned": Pinned,
};
