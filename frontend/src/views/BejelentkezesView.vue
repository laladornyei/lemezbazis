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
    <!-- <div class="row">
        <div class="col-12 col-md-6 mx-md-auto">
            <h3>Regisztráció</h3>
            <registration-form :userData="userData"/>
        </div> -->
    <!-- </div> -->
    <div class="col m-4">
        <h3 class="m-4">Regisztráció</h3>
        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Név</label>
            <div class="col-sm-10">
                <input id="nev" type="text" class="form-control" :class="{ 'is-invalid': errors.nev !== null }"
                    placeholder="Milyen Feri" v-model="nev">
                <div class="invalid-feedback" v-for="e in errors.nev" id="nevFeedback"   >
            {{ e }}
        </div>
                </div>
        </div>
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input id="email" type="email" class="form-control"
            :class="{'is-invalid': errors.email !== null}" v-model="email" placeholder="name@example.com">
                <div class="invalid-feedback" v-for="e in errors.email" id="emailFeedback"   >
            {{ e }}
        </div>
            </div>

        </div>
        <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Jelszó</label>
            <div class="col-sm-10">
                
                <input id="jelszo" type="password" class="form-control"  :class="{'is-invalid': errors.jelszo !== null}" v-model="jelszo" >
                <div class="invalid-feedback" v-for="e in errors.email" id="emailFeedback"   >
            {{ e }}
        </div>
            </div>
        </div>
        <button type="submit" class="btn btn-success m-1" @click="saveUser">Regisztráció</button>
    </div>
</template>

<script setup>
import {ref} from 'vue';
// import RegistrationForm from '../components/RegistrationForm.vue';

// const userData=ref({
//     id:null,
//     nev:'',
//     email:'',
//     jelszo:''
// })

import { useUserStore } from '../stores/index';
import { storeToRefs } from 'pinia';

const { RegisterUser } = useUserStore();

const { errors } = storeToRefs(useUserStore());

function saveUser() {
    if (props.userData.id == null) {
        RegisterUser(props.userData)
            .then(() => {
                router.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

</script>

<style lang="scss" scoped></style>