/**
 * scrollして画面内に入った要素に`_animateStart`などのClass名を付与するディレクティブ
 * @name v-scroll-animation-class
 * @example: v-scroll-animation-class="{ targetQueries: ['.hoge','.fuga'] }
 */
export const vScrollAnimationClass = {
  mounted(el, binding) {
    // 交差を検知した際に "_animateStart" を付与する処理
    const addAnimationClassName = (entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        const ratio = Math.ceil(entry.intersectionRatio * 10);
        const targetEl = entry.target;
        const classList = targetEl.classList;

        // 表示開始 className 追加
        if (ratio >= 1.9) {
          const isAnimationEnded = !!classList.contains("_animateStart");
          if (!isAnimationEnded) {
            classList.add("_animateStart");
          }
        }
      });
    };

    // observer
    const observer = new IntersectionObserver(addAnimationClassName, {
      root: el,
      threshold: [0.1, 0.2, 0.4, 0.6, 0.8, 1],
    });

    // 監視する要素を登録
    const targetQueries = binding.value.targetQueries;
    targetQueries.forEach((query) => {
      const el = document.querySelector(query);
      if (el) {
        observer.observe(el);
      }
    });
  },
};
