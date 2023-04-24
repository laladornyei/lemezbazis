<template>
    <h2 class="m-2">Fórum</h2>
    <button class="btn btn-success m-2" @click="$router.push(`/kozosseg/kerdezes`)">Kérdés feltétele</button>
    <hr class="m3">
    <div class="m-2" v-for="post in postok">
      <post-card :postData="post"/>

    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import PostCard from '../components/PostCard.vue'
import { usePostStore } from '../stores';
const {getAllPost} = usePostStore();
const {postok} = storeToRefs(usePostStore())
getAllPost();
</script>

<style lang="scss" scoped>

</style>