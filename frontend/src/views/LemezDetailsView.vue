<template>
    <h1>{{ selectedLemez.lemezcim }}</h1>
</template>

<script setup>
import { useTermekStore } from '../stores';
import { storeToRefs } from 'pinia';
const { getLemezById } = useTermekStore();
const { selectedLemez } = storeToRefs(useTermekStore());
getLemezById();

</script>


<style lang="scss" scoped>

</style>