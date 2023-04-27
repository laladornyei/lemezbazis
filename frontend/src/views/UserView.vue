<template>
    <div>
        {{ selectedUser }}
        <h3 class="m-2">{{ selectedUser[0].user.name }}</h3>
        <h5 class="m-2">{{ selectedUser[0].user.email }}</h5>
        <hr>
    </div>

    <div class="m-3">
        <h4>Vélemények</h4>
        <div class="mb-3" v-if="isLoggedIn" style="display: inline-flex; align-items: center;">
            <textarea v-model="description" class="form-control form-control-lg" cols="100" type="text"
                placeholder="Véleményezd a felhasználót..."></textarea>
            <button class="btn btn-success" type="button" >Küldés</button>
        </div>
        <div class="mb-3" v-if="!isLoggedIn" style="display: inline-flex; align-items: center;">
            <h5>Jelentkezz be vagy regisztrálj, hogy te is véleményezhess!</h5>
            <button class="btn btn-success m-2" @click="$router.push(`/bejelentkezes`)">Bejelentkezés</button>
            <button class="btn btn-success m-2" @click="$router.push(`/regisztracio`)">Regisztráció</button>
        </div>
    </div>
    <div class="m-3" v-if="selectedUser[0].ratedBy.comment != ''">
        <div class="card shadow" v-for="h in selectedUser[0].ratedBy">
            <div class="card-body">
                 <h5><router-link :to="`/user/${h._id}`">{{
            h.name }}</router-link></h5> 
            
                <h6 class="card-title">{{ h.description }}</h6>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/index'
import { computed } from 'vue'

const authStore = useAuthStore()


const route = useRoute();

const { getVelemeny } = useUserStore();
const { selectedUser } = storeToRefs(useUserStore());

getVelemeny(route.path.split('/')[2]);


const isLoggedIn = computed(() => {
    return authStore.token !== null
})
</script>

<style lang="scss" scoped>

</style>