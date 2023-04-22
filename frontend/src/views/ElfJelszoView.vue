<template>
    <div style="text-align: center;" class="m-4">

        <h1>Elfelejtetted a jelszavad?</h1>
        <h3>Nem probléma!</h3>
        

    </div>
    <h5>Add meg az email címet amivel regisztráltál:</h5>
    <form>
  <div class="form-group m-3">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name@example.com">
  </div>
  <button type="submit" class="btn btn-success m-1">Új jelszót kérek</button>
</form>

<div class="m-3">

    <router-link to="/bejelentkezes">Vissza a bejelentkezéshez</router-link>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>