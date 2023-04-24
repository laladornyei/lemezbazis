<template>
    <div class="card shadow">
  <div class="card-body">
    <h5 class="card-title"><router-link class="nav-link" :to="`/kozosseg/${postData.id}`">{{postData.title}}</router-link></h5>
    <h6 class="card-subtitle mb-2 text-muted">{{ postData.topic}}</h6>
  </div>
</div>
</template>

<script setup>

const props = defineProps(['postData']);

</script>

<style lang="scss" scoped>

</style>