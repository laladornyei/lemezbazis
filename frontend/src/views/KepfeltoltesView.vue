<template>
    <form @submit.prevent="uploadImage">
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

</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useTermekStore } from '../stores'
import {ref} from 'vue'
import { useRoute } from 'vue-router';
const {getFilteredLemezByFilter} = useTermekStore()
const {filteredLemezek} = storeToRefs(useTermekStore())

const route = useRoute()

let szuro = 'lemezcim'
getFilteredLemezByFilter(szuro,route.path.split('/')[3])

const uploadImage = async () => {
  const fileInput = ref(null)
  const termekStore = useTermekStore()

  const upload = async () => {
    const formData = new FormData()
    formData.append('image', fileInput.value.files[0])

    await termekStore.putKepToLemez(filteredLemezek[0]._id, formData)
  }

  return {
    fileInput,
    upload,
  }
}
</script>


<style lang="scss" scoped>

</style>