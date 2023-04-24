<template>
    <div>
      <h2 class="m-3">Kérdezz te is valamit!</h2>
      <post-form v-if="isLoggedIn"/>
      <div v-if="!isLoggedIn">
        <p>Jelentkezz be vagy regisztrálj és válj te is közösségünk tagjává!</p>
        <button class="btn btn-success m-2" @click="$router.push(`/bejelentkezes`)">Bejelentkezés</button>
        <button class="btn btn-success m-2" @click="$router.push(`/regisztracio`)">Regisztráció</button>
        
      </div>
    </div>
  </template>
  
  <script setup>
  
  import PostForm from '../components/PostForm.vue'
  import { useAuthStore } from '../stores/index'
  import { computed } from 'vue'
  
  const authStore = useAuthStore()
    
    const isLoggedIn = computed(() => {
      return authStore.token !== null
  })
  </script>
  <style lang="scss" scoped>
  
  </style>