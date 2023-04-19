<template>
    <div>
      <h2>Regisztráció</h2>
      <form @submit.prevent="register">
        <div>
          <label for="name">Név:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div>
          <label for="password">Jelszó:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Regisztráció</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { defineComponent } from 'vue'
  import { useAuthStore } from '../stores/index'
  
  const authStore = useAuthStore()
  
  let name = ''
  let email = ''
  let password = ''
  
  async function register() {
    try {
      await authStore.register({ name, email, password })
      // Sikeres regisztráció esetén a felhasználót átirányítjuk a bejelentkezési oldalra
      router.push('/bejelentkezes')
    } catch (error) {
      console.error(error)
    }
  }
  </script>
  

<style lang="scss" scoped></style>