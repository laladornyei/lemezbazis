<template>
    <div class="m-3">
        <h2>{{ selectedPost.title }}</h2>
        <!-- <p class="text-muted"><small>Posztolta: <router-link :to="`/user/${selectedPost.user._id}`">{{
            selectedPost.user.name }}</router-link></small></p> -->
        <p class="text-muted"><small>Téma: {{ selectedPost.topic }}</small></p>
        <p>{{ selectedPost.description }}</p>
    </div>
    <hr class="m-3">
    <div class="m-3">
        <h4>Kommentek</h4>
        <div class="mb-3" v-if="isLoggedIn" style="display: inline-flex; align-items: center;">
            <textarea v-model="comment" class="form-control form-control-lg" cols="100" type="text"
                placeholder="Írd ide mit gonodolsz erről..."></textarea>
            <button class="btn btn-success" type="button" @click="Comment()">Küldés</button>
        </div>
        <div class="mb-3" v-if="!isLoggedIn" style="display: inline-flex; align-items: center;">
            <h5>Jelentkezz be vagy regisztrálj, hogy te is kommentelhess!</h5>
            <button class="btn btn-success m-2" @click="$router.push(`/bejelentkezes`)">Bejelentkezés</button>
            <button class="btn btn-success m-2" @click="$router.push(`/regisztracio`)">Regisztráció</button>
        </div>
    </div>
    <div class="m-3" v-if="selectedPost.hozzaszolasok!=''">
        <div class="card shadow" v-for="h in selectedPost.hozzaszolasok">
            <div class="card-body">
                <!-- <h5><router-link :to="`/user/${h.user._id}`">{{
            h.user.name }}</router-link></h5> -->
                <h6 class="card-title">{{ h.description }}</h6>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '../stores';
import { storeToRefs } from 'pinia';
const route = useRoute();

const { getPostById } = usePostStore();
const { selectedPost } = storeToRefs(usePostStore());

getPostById(route.path.split('/')[2]);

import { useAuthStore } from '../stores/index'
import { computed } from 'vue'

const authStore = useAuthStore()

const isLoggedIn = computed(() => {
    return authStore.token !== null
})
  
  const { push } = useRouter();
  let comment = ''
  
  async function Comment() {
    try {
      await usePostStore().postHozzaszolas({ comment })

    } catch (error) {
      console.error(error)
    }
  }
</script>

<style lang="scss" scoped></style>