<template>
    <div class="col m-4">
        <h3 class="m-4">Regisztráció</h3>
        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Név</label>
            <div class="col-sm-10">
                <input id="nev" type="text" class="form-control"
                    placeholder="Milyen Feri" v-model="userData.nev">
                <div class="invalid-feedback" id="nevFeedback"   >
        </div>
                </div>
        </div>
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input id="email" type="email" class="form-control" v-model="userData.email" placeholder="name@example.com">
                <div class="invalid-feedback" id="emailFeedback"   >
        </div>
            </div>

        </div>
        <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Jelszó</label>
            <div class="col-sm-10">
                
                <input id="jelszo" type="password" class="form-control"   v-model="userData.jelszo" >
                <div class="invalid-feedback" id="emailFeedback"   >
        </div>
            </div>
        </div>
        <button type="submit" class="btn btn-success m-2" @click="saveUser()">Regisztráció</button>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/index';
import { storeToRefs } from 'pinia';

const props = defineProps(['userData']);
const { RegisterUser } = useUserStore();

function saveUser() {
    RegisterUser(props.userData)
}

</script>

<style lang="scss" scoped></style>