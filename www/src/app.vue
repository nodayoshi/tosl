<script setup>
import Header from "./components/_header.vue";
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()

</script>

<style lang="scss">
@media screen {

  html,
  body {
    background: #173b51;
    min-height: 100%;
  }

  main {
    padding: 0;
    margin: 0;
  }
}

.main-enter-active,
.main-leave-active {
  animation: main-in .8s infinite linear;
}

.main-enter,
.main-leave-to {
  animation: main-out .5s infinite linear;
}

@keyframes main-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes main-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>

<template>
  <main id="frame">
    <Header />
    <router-view></router-view>
  </main>
</template>