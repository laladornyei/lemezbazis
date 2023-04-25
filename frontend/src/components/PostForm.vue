<template>
    <form @submit.prevent="post">
    <div>
        
        <div class="mb-3">
            <label class="form-label">Kérdés </label>
            <input v-model="title" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Téma </label>
            <select v-model="topic" class="form-select">
                <option selected value="Zene">Zene</option>
                <option value="Technikai">Technikai</option>
                <option value="Műszaki">Műszaki</option>
                <option value="Előadók">Előadók</option>
                <option value="Hibaelhárítás">Hibaelhárítás</option>
                <option value="Keresek">Keresek</option>
                <option value="Egyéb">Egyéb</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Leírás</label>
            <textarea v-model="description" class="form-control" rows="3"></textarea>
        </div>
        <button class="btn btn-success m-2">Küldés</button>
    </div>
</form>
</template>

<script setup>
import { usePostStore } from '../stores';
import { storeToRefs } from 'pinia';

  const postStore = usePostStore()
  let title,topic,description = ''
  

async function post() {
    try {
      await postStore.postPost({title,topic,description  })
      
    } catch (error) {
      console.error(error)
      console.log(kerdes,tema,leiras)
    }
  }


</script>

<style lang="scss" scoped></style>