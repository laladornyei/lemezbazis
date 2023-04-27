<template>
  <h1 class="text-center m-4">Üdvözlünk a Lemezbázis weboldalán!</h1>
  <h3>Oldalunkról</h3>
  <p>Bakelit lemezek adás-vételére Magyarországon még nem volt példa, ezért oldalunk megfelelő Önnek, ha szeretné
    bővíteni, vagy éppen megválni a nem szükséges daraboktól. </p>
  <p>A bakelit lemez egy hagyományos analóg hanghordozó, amelyet a 20. század elején fejlesztettek ki, és a zenei iparban
    használtak a 20. század közepéig. A lemezek egyedülállóak abban a tekintetben, hogy az analóg technológia miatt minden
    másolat és felvétel valóban egyedi, ez azt jelenti, hogy minden egyes lemez más hangminőséget adhat vissza.</p>
  <p>Az első bakelit lemezjátszók egyszerű mechanikus szerkezetűek voltak, amelyeket kézzel kellett forgatni. Azonban az
    idő múlásával megjelentek az elektronikus változatok, a csípőkaros modellek és az automatikus lemezjátszók. Ma az új
    technológiák előnyeit kihasználva a bakelit lemezjátszók egyre népszerűbbek, miközben megőrzik a régi, analóg
    hangzást.</p>
  <!-- <div class="d-flex justify-content-between">
      <div class="col-md-6 col-lg-4">
        <img src="../régibakelitlejatszo.png" alt="Oldschool bakelitlejátszó">
      </div>
      <div class="col-md-6 col-lg-4">
        <img src="../újbakalitlemez.png" alt="Newshcool bakelitlejátszó" class="img-thumbnail img-fluid">
      </div>
    </div> -->
  <h3>Jelenleg kapható lemezek az oldalon:</h3>
  <div class="row d-flex flex-row flex-wrap justify-content-center">
    <div class="col-md-3 col-sm-4 mb-4 termek-card-container" v-for="(l, index) in lemezek.slice(0, 4)" :key="index">
      <termek-card :lemezData="l" class="termek-card-custom-class" />
    </div>
    <div class="d-grid gap-2">
      <router-link class="nav-link" to="/eladas"><button class="btn btn-success " type="button" style="width: 80%;">További lemezek betöltése </button></router-link>
    </div>
  </div>
</template>
  
<script setup>
import TermekCard from '../components/TermekCard.vue';
import { useTermekStore } from '../stores';
import { storeToRefs } from 'pinia';
const { getEladoLemezek } = useTermekStore();
const { lemezek } = storeToRefs(useTermekStore());
getEladoLemezek();
</script>

<style lang="scss" scoped></style>