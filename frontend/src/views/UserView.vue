<template>
    <div>
        <h3 class="m-2">{{ felhasznalo.name }}</h3>
        <h5 class="m-2">{{ felhasznalo.email }}</h5>
        <hr>
    </div>
<!-- 
    <div class="m-3" style="min-height: 42.5vh;">
        <h4>Vélemények</h4>
        <input type="number" class="form-control" min="1" max="5" v-model="rating" style="width: 50px;">
        <div>
            &#9733;
        </div>
        
        <div class="mb-3" v-if="isLoggedIn" style="display: inline-flex; align-items: center;">
            <textarea v-model="leiras" class="form-control form-control-lg" cols="100" type="text"
                placeholder="Véleményezd a felhasználót..."></textarea>
            <button class="btn btn-success" type="button" @click="velemeny()">Küldés</button>
        </div>
        <div class="mb-3" v-if="!isLoggedIn" style="display: inline-flex; align-items: center;">
            <h5>Jelentkezz be vagy regisztrálj, hogy te is véleményezhess!</h5>
            <button class="btn btn-success m-2" @click="$router.push(`/bejelentkezes`)">Bejelentkezés</button>
            <button class="btn btn-success m-2" @click="$router.push(`/regisztracio`)">Regisztráció</button>
        </div>
    </div>



    {{ selectedUser }}
    <p>-</p>
    
    <div class="m-3" v-if="selectedUser != ''">
        <div class="card shadow" v-for="h in selectedUser.length">
            <div class="card-body">
                 <h5><router-link :to="`/user/${selectedUser[h]._id}`">{{
                    selectedUser[h].name }}</router-link></h5>

                <h6 class="card-title">{{ h.comment }}</h6>
            </div>
        </div>
    </div>  -->
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/index'
import { computed } from 'vue'

const authStore = useAuthStore()
const userStore = useUserStore()


let rating = null
let leiras = ''

const route = useRoute();

const { getUser } = useUserStore();
const { felhasznalo } = storeToRefs(useUserStore());
const { getVelemeny } = useUserStore();
const { selectedUser } = storeToRefs(useUserStore());
let id = route.path.split('/')[2]
getUser(id);
getVelemeny(id)


const isLoggedIn = computed(() => {
    return authStore.token !== null
})
console.log(rating, leiras);
async function velemeny() {
    try {
        await userStore.postVelemeny({ rating, leiras },id)
        location.reload()
        console.log(rating, leiras);
    } catch (error) {
        console.error(error)
        console.log(rating, leiras);
    }
}
const objectCount = selectedUser.length;
console.log(objectCount);
</script>

<style lang="scss" scoped></style>