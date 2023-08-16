<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from 'vue-router'
import {
  ref,
  reactive,
  onMounted
} from "vue";

const router = useRouter()
const route = useRoute()
const store = useStore();
let show = ref(false)
const menus = reactive([
  {
    name: '',
    link: ''
  },
  {
    name: '',
    link: ''
  },
  {
    name: '',
    link: ''
  },
  {
    name: '',
    link: ''
  },
  {
    name: '',
    link: ''
  },
  {
    name: 'TICKETS',
    link: 'https://zaiko.io/event/358646'
  }
])
const initialize = () => {
  show.value = true
};

onMounted(() => {
  setTimeout(() => {
    initialize()
  }, 2000)
})

</script>

<template>
  <header class="grid color_wh" v-if="show" :class="{ 'show': show }">
    <p class="lexend-exa bold9" v-for="(menu, i) in menus" :ref="'menu' + i" :key="'menu' + i" :data-index="i"><a
        :href="menu.link" target="_blank">{{
          menu.name }}</a></p>
  </header>
</template >

<style lang="scss">
header {
  position: fixed;
  width: 100%;
  z-index: 99999;
  gap: 10px;
  padding: 0.5em;
  grid-template-columns: 5fr 1fr 1fr 1fr 1fr 1fr;

  &:not(.show) {
    p {
      opacity: 0;
    }
  }

  &.show {
    p {
      animation: head-in 0.2s;
    }
  }

  a {
    color: $color-wh;

    &:hover,
    &:active,
    &:visited {
      color: inherit;
    }

    &.router-link-active {
      //background-color: #fbff7c;
    }
  }
}

@keyframes head-in {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>