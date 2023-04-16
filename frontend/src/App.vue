<script setup>
import { RouterView } from "vue-router";
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'


</script>

<template>
  <div class="container-fluid p-0">
      <app-header/>
  </div>
  <div class="container-fluid p-0">
      <app-nav/>
  </div>
  <div class="container">
    <RouterView />
  </div>
  
  <div class="container-fluid p-0">
      <app-footer/>
  </div>
</template>

<style scoped>

</style>
