import { createRouter, createWebHistory } from "vue-router";

import home from "@/components/home.vue";
import error from "@/components/error.vue";
import not_found from "@/components/not_found.vue";
import vuex from "@/store/index";

const DEFAULT_TITLE = "Temple of Sound Nagoya";

export const router = createRouter({
  mode: "hash",
  history: createWebHistory(import.meta.env.BASE_URL),
  base: "/",
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: {
        title: "東別院",
      },
    },
    {
      path: "/error",
      name: "error",
      component: error,
      meta: { title: "ページが見つかりません error" },
    },
    {
      path: "/:catchAll(.*)*",
      component: not_found,
      meta: { title: "ページが見つかりません" },
    },
  ],

  //ページ遷移時スクロール位置がそのままなのでアンカーがなければトップに
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // return new Promise((resolve, reject) => {
      //   setTimeOut(() => {
      //     resolve(savedPosition);
      //   });
      // });
      //console.log(savedPosition);
    } else if (to.hash) {
      //console.log(to.hash);
      return { el: to.hash };
    } else {
      //console.log("scroll top");
      return { top: 0 };
    }
  },
});

router.afterEach((to) => {
  //console.log(to.meta.title);
  const title = to.meta.title ? DEFAULT_TITLE + " | " + to.meta.title : DEFAULT_TITLE;
  document.title = title;
});

// router.beforeEach((to, from, next) => {
//   next();
// });
