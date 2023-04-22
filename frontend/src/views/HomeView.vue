<template>
    <h1 class="text-center m-4">Üdvözlünk a Lemezbázis weboldalán!</h1>
    <h3>Oldalunkról</h3>
    <p>A bakelit lemezek adás-vételére Magyarországon még nem volt példa, ezért oldalunk megfelelő Önnek, ha szeretné bővíteni, vagy éppen megválni a nem szükséges daraboktól.  </p>
    <p class="border-bottom ">A bakelit lemez egy hagyományos analóg hanghordozó, amelyet a 20. század elején fejlesztettek ki, és a zenei iparban használtak a 20. század közepéig. A lemezek egyedülállóak abban a tekintetben, hogy az analóg technológia miatt minden másolat és felvétel valóban egyedi, ez azt jelenti, hogy minden egyes lemez más hangminőséget adhat vissza.</p>

    <h3>Jelenleg felkapottak!:</h3>
    
</template>

<script setup>
import {useRoute} from 'vue-router';
import { useTermekStore } from '../stores';
import {storeToRefs} from 'pinia';

const { getAllTermek } = useTermekStore();
getAllTermek();
</script>

<style lang="scss" scoped>

</style>