<template>
    <div class="row">
        {{ selectedLemez }}
        <div class=" col-md-1"></div>
        <div class="card col-md-4 col-sm-4 mb-3">
            <img :src="`http://localhost:3000/${selectedLemez.photo}`" class="card-img-top" alt="lemez fotó">
            <div class="card-body">
                <h4 class="card-title">{{ selectedLemez.eloado }} - {{ selectedLemez.lemezcim }}
                </h4>
                <div class="row m-3">
                    <div class="col-md-6">
                        <p><b>évjárat: </b></p>
                        <p><b>műfaj: </b></p>
                        <p><b>zeneszámok: </b></p>
                    </div>
                    <div class="col-md-6">
                        <p>{{ selectedLemez.evjarat }}</p>
                        <div v-for="mufaj in selectedLemez.mufaj">
                            {{ mufaj }}

                        </div>
                        <p></p>
                        <div v-for="szam in selectedLemez.zeneszamok">
                            {{ szam }}

                        </div>
                    </div>

                </div>
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