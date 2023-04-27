<template>
  <div class="container mt-4">
    <div class="row g-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Lemez címe:</label>
        <input type="text" class="form-control" v-model="lemezcim">
      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Előadó:</label>
        <input type="text" class="form-control" v-model="eloado">
      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Megjelenés:</label>
        <input type="number" min="1900" max="2099" step="1" v-model="evjarat" class="form-control">
      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Műfaj:</label>
        <input type="text" class="form-control" v-model="mufajInput" @change="setMufaj" />

      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Zeneszámok száma:</label>
        <input type="number" min="1" max="20" v-model="zeneszamokSzama" class="form-control">
      </div>
      <div class="row g-3 mt-3">
        <div class="col-md-12">
          <label for="text" class="form-label">Zeneszámok:</label>
          <div v-for="(input, index) in inputMezok" :key="index">
            <input type="text" class="form-control" :name="'zeneszam' + (index + 1)" v-model="zeneszamok[index]" />
          </div>
        </div>
      </div>

      
      <div class="row g-3 mt-3">
        <div class="col-md-12 d-flex justify-content-center">
          <button class="btn btn-success" type="submit" @click="feltoltes()">Adatok feltöltése</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useTermekStore } from '../stores/index'


const termekStore = useTermekStore()

const zeneszamokSzama = ref(1)
const zeneszamok = ref([''])
let lemezcim, eloado, evjarat = ''
const mufajInput = ref('')
const mufaj = computed(() => [mufajInput.value])

function setMufaj() {
  mufaj.value = [mufajInput.value]
}

const inputMezok = computed(() => {
  const mezok = []
  for (let i = 0; i < zeneszamokSzama.value; i++) {
    mezok.push(i)
  }
  return mezok
})

watch(zeneszamokSzama, (newValue, oldValue) => {
  const diff = newValue - oldValue
  if (diff > 0) {
    for (let i = oldValue; i < newValue; i++) {
      if (inputMezok.value.length <= i) {
        inputMezok.value.push(i)
      }
      zeneszamok.value.push('')
    }
  } else {
    inputMezok.value.splice(newValue, -diff)
    zeneszamok.value.splice(newValue)
  }
})

async function feltoltes() {
  try {

    const lemezData = {
      "lemezcim": lemezcim,
      "eloado": eloado,
      "evjarat": evjarat,
      "mufaj": mufaj.value,
      "zeneszamok": zeneszamok.value
    }
    console.log(lemezData);
    await termekStore.postLemez(lemezData)

    await termekStore.putKepToLemez(id)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped></style>