<script setup>
import Header from "./components/_header.vue";
import Footer from "./components/_footer.vue";
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
    overflow: hidden;
  }
}
</style>

<template>
  <main id="frame">
    <Header />
    <router-view></router-view>
    <Footer />
  </main>
</template>