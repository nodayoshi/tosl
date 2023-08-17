import { createApp } from "vue";
import App from "./App.vue";
import "./scss/main.scss";
import { router } from "./router";
import store from "./store/index";
import { createI18n } from "vue-i18n";
import ja from "./language/ja.json";
import en from "./language/en.json";

import dayjs from "dayjs";
import "dayjs/locale/ja";

const i18n = createI18n({
  locale: "ja",
  fallbackLocale: "en",
  messages: {
    ja,
    en,
  },
});

dayjs.locale("ja");
const app = createApp(App).use(router).use(store).use(i18n).provide("dayjs", dayjs);
app.mount("#app");
