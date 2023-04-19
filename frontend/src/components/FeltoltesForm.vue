<template>
  <div class="container mt-4">
    <div class="row g-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Előadó:</label>
        <input type="text" class="form-control">
      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Megjelenés:</label>
        <input type="number" min="1900" max="2099" step="1" value="2016" class="form-control">
      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Zeneszámok száma:</label>
        <input type="number" min="1" v-model="zeneszamokSzama" class="form-control">
      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Zeneszámok:</label>
        <div v-for="index in zeneszamokSzama" :key="index">
          <input type="text" class="form-control">
        </div>
      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Műfaj:</label>
        <input type="text" class="form-control">
      </div>
    </div>
    <div class="row g-3 mt-3">
      <div class="col-md-12">
        <label for="text" class="form-label">Kép feltöltése:</label>
        <input type="file" class="form-control">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zeneszamokSzama: 1
    };
  },
  watch: {
    zeneszamokSzama(newValue) {
      // Itt történik az adatváltozás figyelése és a DOM manipuláció
      // a zeneszám mezők beállításához
    }
  }
}
</script>

<style scoped>
</style>