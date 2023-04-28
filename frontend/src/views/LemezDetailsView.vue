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
                       <br> <b>leírás:</b> {{ termek.leiras }} <br> 
                    </a>
                    <div v-if="isLoggedIn">
                        <button v-if="termek.user.name == user.name" class="btn btn-danger m-1" @click="deleteT(termek._id)">Törlés</button>

                    </div>
                </div>
            </div>
            <button class="btn btn-success w-50 m-4" @click="$router.push(`/feltoltes/termek/${selectedLemez.id}`)">Eladó termék feltöltése</button>
        </div>
        <div class=" col-md-1"></div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useTermekStore } from '../stores';
import { useUserStore } from '../stores';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/index'
import { computed } from 'vue'

const authStore = useAuthStore()
const route = useRoute();

const { getLemezById } = useTermekStore();
const { getBejelentkezett } = useUserStore();
const { deleteTermek } = useTermekStore();
const { selectedLemez } = storeToRefs(useTermekStore());
const { user } = storeToRefs(useUserStore());

getLemezById(route.path.split('/')[2]);
getBejelentkezett();


const isLoggedIn = computed(() => {
    return authStore.token !== null
})

function deleteT(id){
    deleteTermek(id)
    location.reload()
}

</script>


<style lang="scss" scoped></style>