<template>
    <h3 class="mb-4">Eladó lemezek:</h3>

    <div class="container">
  <div class="row g-2">
    <div class="col-md-3 col-sm-12">
      <select class="form-select" v-model="szuro">
        <option selected value="lemezcim">Lemez cím</option>
        <option value="eloado">Előadó</option>
        <option value="mufaj">Műfaj</option>
        <option value="evjarat">Évjárat</option>
      </select>
    </div>
    <div class="col-md-6 col-sm-12">
      <div class="input-group">
        <input type="search" v-model="kereses" class="form-control" placeholder="Keresés..." />
      </div>
    </div>
    <div class="col-md-3 col-sm-12">
      <button type="button" class="btn btn-success w-50" @click="search()">
        Keresés
      </button>
    </div>
  </div>
</div>


    <div class="row d-flex flex-row flex-wrap justify-content-center">
        <div class="col-md-3 col-sm-4 mb-4 termek-card-container" v-for="l in displayedLemezek">
            <termek-card :lemezData="l" class="termek-card-custom-class" />
        </div>

    </div>
</template>

<script setup>
import TermekCard from '../components/TermekCard.vue';
import { useTermekStore } from '../stores';
import { storeToRefs } from 'pinia';
const { getAllLemezek,getFilteredLemezByFilter } = useTermekStore();
const { lemezek,filteredLemezek } = storeToRefs(useTermekStore());
getAllLemezek();
let szuro,kereses = ''
const displayedLemezek = lemezek

function search() {

    getFilteredLemezByFilter(szuro, kereses)
    displayedLemezek.value = filteredLemezek;

}
</script>

<style lang="scss" scoped></style>