
<template>
  <h3 class="m-2">Fórum</h3>
  <button class="btn btn-success m-2" @click="$router.push(`/kozosseg/kerdezes`)">Kérdés feltétele</button>
    <div class="mb-3"  style="float:right;display: inline-flex; align-items: center;">
            <label class="form-label m-2">Szűrés: </label>
            <select v-model="topic" class="form-select" @change="getPosts">
                <option value="">Nincs szűrő</option>
                <option value="Zene">Zene</option>
                <option value="Technikai">Technikai</option>
                <option value="Műszaki">Műszaki</option>
                <option value="Előadók">Előadók</option>
                <option value="Hibaelhárítás">Hibaelhárítás</option>
                <option value="Keresek">Keresek</option>
                <option value="Egyéb">Egyéb</option>
            </select>
        </div>
  <hr class="m3">
  <div class="m-2" v-for="post in displayedPosts">
    <post-card :postData="post" />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import PostCard from '../components/PostCard.vue'
import { usePostStore } from '../stores';
const { getAllPost } = usePostStore();
const { getFilteredPostByTopic } = usePostStore();
const { postok } = storeToRefs(usePostStore())
const { filteredPosts } = storeToRefs(usePostStore())
getAllPost();
let topic = ''
const displayedPosts = postok;
function getPosts() {
  if (topic == '') {
    getAllPost();
    displayedPosts.value = postok;
    location.reload()
  } else {
    getFilteredPostByTopic(topic);
    displayedPosts.value = filteredPosts;

  }
}
</script>
<style lang="scss" scoped></style>

