import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });
const isEmulating = window.location.hostname === "localhost";
const store = createStore({
  state() {
    return {
      user: {
        uid: "",
      },
    };
  },
  mutations: {},
  actions: {},
  plugins: [
    createPersistedState({
      key: import.meta.env.VITE_SALT,
      storage: !isEmulating
        ? {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
          }
        : "",
    }),
  ],
});

export default store;
