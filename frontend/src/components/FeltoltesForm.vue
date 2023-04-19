<template>
    <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="text" class="col-form-label">Előadó :</label>
  </div>
  <div class="col-auto">
    <input type="text " class="form-control align-items-center">
  </div>
  
  <div class="col-auto">
    <label for="text" class="col-form-label">Megjelenes:</label>
  </div>
  <div class="col-auto">
    <input type="year" min="1900" max="2099" step="1" value="2016" class="form-control">
  </div>
  <div class="col-auto">
    <label for="text" class="col-form-label">Zeneszámok:</label>
  </div>
  <div class="col-auto">
    <input type="list" class="form-control">
  </div>
  <div class="col-auto">
    <label for="text" class="col-form-label">Műfaj:</label>
  </div>
  <div class="col-auto">
    <input type="text" class="form-control">
  </div>
</div>
  <div class="col-auto">
    <label for="text" class="col-form-label">Kép feltöltése:</label>
</div>
<div>
    <input type="file" class="form-control">
</div>

</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>