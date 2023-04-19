<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="email">Felhasználónév:</label>
      <input type="text" id="username" v-model="email">
    </div>
    <div>
      <label for="password">Jelszó:</label>
      <input type="password" id="password" v-model="password">
    </div>
    <button type="submit">Bejelentkezés</button>
  </form>
</template>

<script setup>
import { useAuthStore } from '../stores/index'
import { ref } from 'vue'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const submitForm = async () => {
  await authStore.login(email.value, password.value)
}
</script>



<style lang="scss" scoped></style>