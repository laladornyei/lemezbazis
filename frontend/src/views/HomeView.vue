<template>
    <h1 class="text-center m-4">Üdvözlünk a Lemezbázis weboldalán!</h1>
<<<<<<< Updated upstream
    <h3>Rólunk</h3>
    <p>Felületünk 2023 áprilisában startolt, azzal a céllal, hogy a bakelit lemezek szerelmesei könnyedén bővíthessék gyűjteményüket,illetve megváljanak a már nem szükséges daraboktól. Oldalunk Magyarországon egyedülálló, ugyanis nincs még egy ilyen lemezkereskedő oldal hazánkban, éppen ezért határoztuk el magunkat, hogy a gyűjtők itt megtalálják, vagy eladják kívánt a lemezeiket. </p>
    <p class="border-bottom ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt libero. Proin non urna vehicula, efficitur ligula id, volutpat nulla. Donec rhoncus euismod blandit. Maecenas eu risus commodo, accumsan odio ut, blandit tellus. Sed ligula libero, ornare vitae feugiat non, vestibulum sed arcu. Nam vulputate mi a nisl pretium elementum. Suspendisse convallis lobortis elit, vel vehicula augue tempus eu. Morbi lectus magna, blandit eu lectus sed, malesuada molestie arcu. Cras ornare lectus eu ex ullamcorper condimentum. Vivamus varius nec nulla eu ornare. Nam elementum lorem sed nulla dictum, at faucibus eros elementum. In bibendum efficitur convallis. Suspendisse at mi eget lectus tincidunt bibendum eu et nisi. Quisque lorem quam, facilisis ut vulputate vitae, blandit et leo.</p>
=======
    <div class="d-flex justify-content-center">
        <h4>Kattints a gombra,
válts egy jobbra!
Ha lemez kell csak regisztrálj
és ne gyereket molesztálj! </h4>
    </div>
    <div class="d-flex justify-content-center m-2 border-bottom">
        <button type="button" class="btn btn-success m-2" @click="$router.push('/regisztracio')">Regisztrálok!</button>
        
    </div>
    <h3>
        Rólunk
    </h3>
    <p class="m-2">Felületünk 2023 áprilisában startolt, azzal a céllal, hogy a bakelit lemezek szerelmesei könnyedén bővíthessék, illetve szortírozhassák (ez nem jó szó) gyűjteményüket.</p>
    <p class="border-bottom m-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt libero. Proin non urna vehicula, efficitur ligula id, volutpat nulla. Donec rhoncus euismod blandit. Maecenas eu risus commodo, accumsan odio ut, blandit tellus. Sed ligula libero, ornare vitae feugiat non, vestibulum sed arcu. Nam vulputate mi a nisl pretium elementum. Suspendisse convallis lobortis elit, vel vehicula augue tempus eu. Morbi lectus magna, blandit eu lectus sed, malesuada molestie arcu. Cras ornare lectus eu ex ullamcorper condimentum. Vivamus varius nec nulla eu ornare. Nam elementum lorem sed nulla dictum, at faucibus eros elementum. In bibendum efficitur convallis. Suspendisse at mi eget lectus tincidunt bibendum eu et nisi. Quisque lorem quam, facilisis ut vulputate vitae, blandit et leo.</p>
>>>>>>> Stashed changes

    <h3>Legutóbb feltöltött lemezek</h3>
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