<template>
  <div v-if="isLoggedIn">
    <form @submit.prevent="uploadImage($event)" ref="myForm">
      <div class="row g-3 mt-3">
        <div class="col-md-12">
          <label for="text" class="form-label">Kép feltöltése:</label>
          <input type="file" class="form-control">
        </div>
        <div class="col-md-12 mt-3 text-center">
          <button class="btn btn-success">Feltöltés</button>
        </div>
      </div>
    </form>

  </div>
  <div class="mb-3" v-if="!isLoggedIn" style="display: inline-flex; align-items: center;">
            <h5>Jelentkezz be vagy regisztrálj, hogy te is eladhass!</h5>
            <button class="btn btn-success m-2" @click="$router.push(`/bejelentkezes`)">Bejelentkezés</button>
            <button class="btn btn-success m-2" @click="$router.push(`/regisztracio`)">Regisztráció</button>
        </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useTermekStore } from '../stores'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/index'
import { computed } from 'vue'

const authStore = useAuthStore()
const { getFilteredLemezByFilter } = useTermekStore()
const { filteredLemezek } = storeToRefs(useTermekStore())
const { push } = useRouter();
const route = useRoute()

const isLoggedIn = computed(() => {
    return authStore.token !== null
})

let szuro = 'lemezcim'
getFilteredLemezByFilter(szuro, route.path.split('/')[3]) 
const uploadImage = async (e) => {
  const termekStore = useTermekStore()
  let img = e.target[0].files[0]
  
  const upload = async () => {  
    const formData = new FormData()
    formData.append('image', img)
    let id = filteredLemezek.value[0].id
    console.log(id);
    await termekStore.putKepToLemez(id, formData)
    push({ path: `/feltoltes` })
  }

  await upload()
}

</script>


<style lang="scss" scoped></style>