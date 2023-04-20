<template>
    <div class="row">
        {{ selectedLemez }}
        <div class=" col-md-1"></div>
        <div class="card col-md-4 col-sm-4 mb-3">
            <img :src="`http://localhost:3000/${selectedLemez.photo}`" class="card-img-top" alt="lemez fotó">
            <div class="card-body">
                <h5 class="card-title">{{ selectedLemez.lemezcim }}
                </h5>
                <div v-for="mufaj in selectedLemez.mufaj">
                    <p><b>műfaj: </b>{{ mufaj }}</p>
                </div>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        <div class=" col-md-1"></div>
        <div class="card col-md-4 col-sm-4 mb-3">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
        <div class=" col-md-1"></div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useTermekStore } from '../stores';
import { storeToRefs } from 'pinia';

const route = useRoute();

const { getLemezById } = useTermekStore();
const { selectedLemez } = storeToRefs(useTermekStore());

getLemezById(route.path.split('/')[2]);

</script>


<style lang="scss" scoped></style>