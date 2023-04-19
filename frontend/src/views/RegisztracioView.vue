<template>
    <div>
      <h2 class="m-4">Regisztráció</h2>
      <form @submit.prevent="register">
        <div>
          <label class="m-3" for="name">Név:</label>
          <input class="form-control" type="text" id="name" v-model="name" />
        </div>
        <div>
          <label class="m-3" for="email">Email:</label>
          <input class="form-control" type="email" id="email" v-model="email" />
        </div>
        <div>
          <label class="m-3" for="password">Jelszó:</label>
          <input class="form-control" type="password" id="password" v-model="password" />
        </div>
        <button class="btn btn-success" type="submit">Regisztráció</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { defineComponent } from 'vue'
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