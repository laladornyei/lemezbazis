<script setup>
import { RouterView } from 'vue-router';
import header from '../components/Header.vue'
import footer from '../components/Footer.vue'
</script>

<template>  
    <div class="main-container">
      <header></header>
      <router-view></router-view>
      <footer></footer>
    </div>
    
</template>

<style scoped>

</style>
