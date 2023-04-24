<template>
    <form @submit.prevent="post">
    <div>
        <h2 class="m-3">Kérdezz te is valamit!</h2>
        <div class="mb-3">
            <label class="form-label">Kérdés </label>
            <input v-model="kerdes" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Téma </label>
            <select v-model="tema" class="form-select">
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
            <textarea v-model="leiras" class="form-control" rows="3"></textarea>
        </div>
        <button class="btn btn-success m-2" @click="post()">Küldés</button>
    </div>
</form>
</template>

<script setup>
import { usePostStore } from '../stores';
import { storeToRefs } from 'pinia';
//const { getAllPost } = usePostStore();
//getAllPost();

  
  const postStore = usePostStore()
  let kerdes,tema,leiras = ''
  

async function post() {
    try {
      await postStore.postPost({kerdes,tema,leiras  })
      location.reload()
    } catch (error) {
      console.error(error)
      console.log(kerdes,tema,leiras)
    }
  }
</script>

<style lang="scss" scoped></style>