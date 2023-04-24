<template>
    <h3 class="mb-4">Eladó lemezek:</h3>
    <div class="row d-flex flex-row flex-wrap justify-content-center">
        <div class="col-md-3 col-sm-4 mb-4 termek-card-container" v-for="l in lemezek" :key="l.id" >
            <termek-card v-if="l.termekek != ''"  :lemezData="l" class="termek-card-custom-class" />
        </div>
        
    </div>

</template>

<script setup>
import TermekCard from '../components/TermekCard.vue';
import { useTermekStore } from '../stores';
import { storeToRefs } from 'pinia';
const { getAllLemezek } = useTermekStore();
const { lemezek } = storeToRefs(useTermekStore());
getAllLemezek();

</script>

<style lang="scss" scoped></style>