<template>
    <div class="card mb-3 shadow">
        <img class="card-img-top" :src="lemezData.photo" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title"><router-link class="nav-link" to="/bejelentkezes">{{ lemezData.lemezcim }}</router-link></h5>
            <p class="card-text"><b>{{lemezData.eloado}}</b> - {{lemezData.evjarat}}</p>
            <div v-for="mufaj in lemezData.mufaj">
                <p><b>műfaj: </b>{{ mufaj }}</p>
            </div>
            <!-- <div v-for="szam in lemezData.zeneszamok">
                <p>{{ szam }}</p>
            </div> -->
            <p class="card-text">{{lemezData.user}}</p> 
            <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
        </div>
    </div>
</template>

<script setup>
import Axios from '../services/dataservice';
import { useTermekStore } from '../stores';

const props = defineProps(['lemezData']);
</script>

<style lang="scss" scoped></style>