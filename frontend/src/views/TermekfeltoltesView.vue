<template>
    <div class="container" style="min-height: 42.5vh;">
      
        <div class="mb-3" v-if="!isLoggedIn" style="display: inline-flex; align-items: center;">
            <h5>Jelentkezz be vagy regisztrálj, hogy te is eladhass!</h5>
            <button class="btn btn-success m-2" @click="$router.push(`/bejelentkezes`)">Bejelentkezés</button>
            <button class="btn btn-success m-2" @click="$router.push(`/regisztracio`)">Regisztráció</button>
        </div>
  <form v-if="isLoggedIn">
    <div class="row mb-3">
      <label for="egysegar" class="col-sm-3 col-form-label">Egységár:</label>
      <div class="col-sm-9">
        <input type="number" class="form-control" v-model="egysegar" id="egysegar" name="egysegar">
      </div>
    </div>

    <div class="row mb-3">
      <label for="lemezallapot" class="col-sm-3 col-form-label">Lemezállapot:</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" id="lemezallapot" v-model="lemezallapot" name="lemezallapot">
      </div>
    </div>

    <div class="row mb-3">
      <label for="boritoallapot" class="col-sm-3 col-form-label">Borítóállapot:</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" id="boritoallapot" v-model="boritoallapot" name="boritoallapot">
      </div>
    </div>

    <div class="row mb-3">
      <label for="leiras" class="col-sm-3 col-form-label">Leírás:</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" id="leiras" v-model="leiras" name="leiras">
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-sm-12 text-center">
        <button type="submit" class="btn btn-success" @click="feltoltes()">Feltöltés</button>
      </div>
    </div>
  </form>
</div>

</template>

<script setup>
import { useTermekStore } from '../stores';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/index'
import {computed} from 'vue'
const authStore = useAuthStore()
  const termekStore = useTermekStore()
  let egysegar,lemezallapot,boritoallapot,leiras = ''
  
  const route = useRoute()
let id = route.path.split('/')[3]
async function feltoltes() {
    try {
      await termekStore.postTermek({egysegar,lemezallapot,boritoallapot,leiras  },id)
      
    } catch (error) {
      console.error(error)
      console.log(kerdes,tema,leiras)
    }
  }
  const isLoggedIn = computed(() => {
    return authStore.token !== null
})
</script>

<style lang="scss" scoped>

</style>