<template>
    <h2 class="mb-4">Eladó lemezek:</h2>
    <div class="row">
        <div class="col-md-3 col-sm-4 justify-content-center" v-for="l in lemezek">
            <termek-card v-if="l.termekek != ''" :lemezData="l" />
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