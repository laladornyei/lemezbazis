<template>
    <nav class="navbar navbar-expand-lg menu">
        <div class="container">
            <a href="http://127.0.0.1:5173/"><img src="../assets/img/logo.png" class="rounded float-left" alt="logo" width="216" height="50"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav w-100">

                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Főmenü</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/eladas">Eladó lemezek</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/kozosseg">Fórum</router-link>
                    </li>

                    <li class="nav-item  ms-auto" style="float:right" v-if="!isLoggedIn">
                        <router-link class="nav-link" to="/bejelentkezes">Bejelentkezés</router-link>
                    </li>
                    <li class="nav-item  " style="float:right" v-if="!isLoggedIn">
                        <router-link class="nav-link" to="/regisztracio">Regisztráció</router-link>
                    </li>
                    <li class="nav-item dropdown ms-auto" v-if="isLoggedIn" style="float:right">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Profil
                        </a>
                        <ul class="dropdown-menu">
                            <p>Üdv, {{ user }}</p>
                            <li><router-link class="nav-link" to="/feltoltes">Feltöltés</router-link></li>
                            <li><router-link class="nav-link" to="/szerkesztes">Profil szerkesztése</router-link></li>
                            <li><router-link class="nav-link" to="/kivansag">Kívánságlista</router-link></li>
                            <li><router-link class="nav-link" to="/uzenetek">Üzenetek</router-link></li>
                            <div class="dropdown-divider"></div>
                            <li v-if="isLoggedIn"><a @click="logout" class="dropdown-item">Kijelentkezés</a></li>

                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/index'
import { computed } from 'vue'
import {useUserStore} from '../stores'
import { storeToRefs } from 'pinia';
const {getBejelentkezett} = useUserStore()
const {user} = storeToRefs(useUserStore())
getBejelentkezett();
const authStore = useAuthStore()

const isLoggedIn = computed(() => {
    return authStore.token !== null
})

const logout = () => {
    authStore.logout()
}
</script>

<style lang="scss" scoped></style>