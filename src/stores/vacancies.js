import { get, writable } from "svelte/store";
import api from "../services/api";

const queryLimit = 20;

export const vacancies = (() => {
  const query = writable({ limit: queryLimit });
  const list = writable([]);

  return {
    subscribe: list.subscribe,
    clear: () => {
      query.set({ limit: queryLimit });
      list.set([]);
    },
    search: (terms) => {
      query.set({ terms, limit: queryLimit });
      return api.fts(get(query)).then((res) => list.set(res));
    },
    more: () => {
      const oldList = get(list);
      const offsetId = oldList[oldList.length - 1].id;
      return api.fts({ ...get(query), offsetId }).then((res) => {
        list.set(oldList.concat(res));
      });
    },
    hidden: () => {
      return api.getHidden({ limit: queryLimit }).then((res) => list.set(res));
    },
    moreHidden: () => {
      const oldList = get(list);
      const offsetId = oldList[oldList.length - 1].id;
      return api
        .getHidden({ offsetId, limit: queryLimit })
        .then((res) => list.set(res));
    },
    hide: (id) => {
      return api.hide(id).then(() => {
        list.update((old) => old.filter((i) => i.id !== id));
      });
    },
  };
})();
