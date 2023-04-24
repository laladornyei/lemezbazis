<template>
    <div class="row m-4">
        <div class=" col-md-1"></div>
        <div class=" col-md-4 col-sm-4 mb-3">
            <img :src="`http://localhost:3000/${selectedLemez.photo}`" class="card-img-top m-4" alt="lemez fotó">
            <div class="card-body">
                <h4 class="card-title m-4">{{ selectedLemez.eloado }} - {{ selectedLemez.lemezcim }}
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
                            - {{ szam }}

                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class=" col-md-2"></div>
        <div class="col-md-4 col-sm-4 mb-3">
            <h3 class="m-4">Eladó termékek: </h3>
            <div class="list-group">
                <div class="m-2" v-for="termek in selectedLemez.termekek">
                    <a class="list-group-item list-group-item-action" @click="$router.push(`/user/${termek.user._id}`)">
                       <b><h5>{{termek.user.name}} </h5> </b><b> ár: {{ termek.egysegar }}  Ft</b>
                       <br> <b>lemez állapota:</b> {{ termek.lemezallapot }} <br><b> borító állapota:</b> {{ termek.boritoallapot }}
                       <br> <b>leírás:</b> {{ termek.leiras }} 
                </a>
                    

                </div>
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