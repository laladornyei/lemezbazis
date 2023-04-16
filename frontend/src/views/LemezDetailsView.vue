<template>
    <h1></h1>
</template>

<script setup>
import { ref,computed } from "vue";
import { useTermekStore } from '../stores';
import { storeToRefs } from 'pinia';
const { getAllLemezek } = useTermekStore();
const { lemezek } = storeToRefs(useTermekStore());
getAllLemezek();
const lemez = ref();

lemez.value = getAllLemezek().find((x) => x.lemezcim == route.params.lemezcim);
console.log(route.params.lemezcim);
console.log(lemez.value);
</script>


<style lang="scss" scoped>

</style>