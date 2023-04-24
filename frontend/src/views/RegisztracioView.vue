<template>
  <form @submit.prevent="register">
  <div class="row">
    <div class="col m-4">
      <h3 class="m-4">Regisztráció</h3>
      
        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Név:</label>
          <div class="col-sm-10">
          <input class="form-control" type="text" id="name" v-model="name" placeholder="Példa Tamás"/>
        </div>
        </div>
        <div class="mb-3 row">
          <label for="email" class="col-sm-2 col-form-label">Email:</label>
          <div class="col-sm-10">
          <input class="form-control" type="email" id="email" v-model="email" placeholder="name@example.com"/>
        </div>
        </div>
        <div class="mb-3 row">
          <label for="password" class="col-sm-2 col-form-label">Jelszó:</label>
          <div class="col-sm-10">
          <input class="form-control" type="password" id="password" v-model="password" placeholder="Minimum 6 karakter megadása kötelező!"/>
        </div>
        </div>
        <button class="btn btn-success" type="submit">Regisztráció</button>
      </div>
    </div>
      </form>
    
  </template>
  
  <script setup>

  import { useUserStore } from '../stores/index'
  import { useRoute, useRouter } from 'vue-router';
  
  const userStore = useUserStore()
  const { push } = useRouter();
  let name, email, password = ''
  
  async function register() {
    try {
      await userStore.PostUser({ name, email, password })
      push({ path: '/bejelentkezes' })
    } catch (error) {
      console.error(error)
    }
  }
  </script>
  
  

<style lang="scss" scoped></style>