<template>
    <div class="card mb-3 shadow">
        <img class="card-img-top" :src="`http://localhost:3000/api/public/uploads/${lemezData.photo}`" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title"><router-link @click="setId(lemezData.id)" class="nav-link" :to="`/eladas/${lemezData.lemezcim}`">{{ lemezData.lemezcim }}</router-link></h5>
            <p class="card-text"><b>{{lemezData.eloado}}</b> - {{lemezData.evjarat}}</p>
            <div v-for="mufaj in lemezData.mufaj">
                <p><b>műfaj: </b>{{ mufaj }}</p>
            </div>
            <!-- <div v-for="szam in lemezData.zeneszamok">
                <p>{{ szam }}</p>
            </div> -->
            <!-- <p class="card-text">{{lemezData.user}}</p>  -->
            <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
        </div>
    </div>
</template>

<script setup>
import { useTermekStore } from '../stores';

import instance from '../services/dataservice';

const props = defineProps(['lemezData']);
const {setId} = useTermekStore();



</script>

<style lang="scss" scoped></style>