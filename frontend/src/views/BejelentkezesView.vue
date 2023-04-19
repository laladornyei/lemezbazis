<template>
  <form @submit.prevent="submitForm">

    <div class="row">
        <div class="col m-4">
            <h3 class="m-4">Bejelentkezés</h3>
            <div class="mb-3 row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" placeholder="name@example.com"  v-model="email">
                </div>

            </div>
            <div class="mb-3 row">
                <label for="password" class="col-sm-2 col-form-label">Jelszó</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="password" v-model="password">
                </div>
            </div>
            <button type="submit" class="btn btn-success m-1">Bejelentkezés</button>
            <div class="m-3">

                <router-link to="/elfelejtett-jelszo">Elfelejtetted a jelszavad?</router-link>
            </div>
        </div>
        </div>
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