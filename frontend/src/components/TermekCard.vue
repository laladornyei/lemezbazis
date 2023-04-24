<template>
    <div class="card mb-3 shadow">
        <img class="card-img-top" :src="`http://localhost:3000/${lemezData.photo}`" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title"><router-link class="nav-link" :to="`/eladas/${lemezData.id}`">{{ lemezData.lemezcim }}</router-link></h5>
            <p class="card-text"><b>{{lemezData.eloado}}</b> - {{lemezData.evjarat}}</p>
            <div v-for="mufaj in lemezData.mufaj">
                <p><b>műfaj: </b>{{ mufaj }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTermekStore } from '../stores';

const props = defineProps(['lemezData']);



</script>

<style lang="scss" scoped></style>