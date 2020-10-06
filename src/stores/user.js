import { writable } from "svelte/store";
import { replace } from "svelte-spa-router";
import api from "../services/api";

export const user = (() => {
  const store = writable(null);
  return {
    subscribe: store.subscribe,
    set: store.set,
    check: () => {
      api
        .me()
        .then((res) => {
          store.set(res);
        })
        .catch((err) => {
          store.set(null);
          replace("/login");
        });
    },
  };
})();
