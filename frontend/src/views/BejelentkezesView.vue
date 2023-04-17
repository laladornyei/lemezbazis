<template>
    <!-- <div class="row">
        <div class="col m-4">
            <h3 class="m-4">Bejelentkezés</h3>
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" placeholder="name@example.com">
                </div>

            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Jelszó</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control">
                </div>
            </div>
            <button type="submit" class="btn btn-success m-1">Bejelentkezés</button>
            <div class="m-3">

                <router-link to="/elfelejtett-jelszo">Elfelejtetted a jelszavad?</router-link>
            </div>
        </div>
        <div class="col m-4">
            <h3 class="m-4">Regisztráció</h3>
            <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Név</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" placeholder="Milyen Feri">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" placeholder="name@example.com">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Jelszó</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control">
                </div>
            </div>
            <button type="submit" class="btn btn-success m-1">Regisztráció</button>
        </div>
    </div> -->
    <div class="row">
        <div class="col-12 col-md-6 mx-md-auto">
            <h3>Regisztráció</h3>
            <registration-form :userData="userData"/>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import RegistrationForm from '../components/RegistrationForm.vue';

const userData=ref({
    id:null,
    nev:'',
    email:'',
    jelszo:''
})
</script>

<style lang="scss" scoped></style>