import { defineStore } from "pinia";
import Axios from '../services/dataservice';

export const useTermekStore = defineStore('TermekekStore',{
    state: ()=>({ 
        termekek:[],
        lemezek:[],
        selectedLemezId:null,
        selectedLemez:[]
     }),
    getters:{},
    actions:{
        getAllTermek(){
            return Axios.get('/termekek')
            .then(resp =>{
                this.termekek = resp.data.data;
                //console.log(resp.data);
            })
            .catch(err => {
                return Promise.reject(err);
            })
        },
        getAllLemezek(){
            return Axios.get('/lemezek')
            .then(resp =>{
                this.lemezek = resp.data.data;
                //console.log(resp.data);
            })
            .catch(err => {
                return Promise.reject(err);
            })
        },
        getLemezById(id){ 
            Axios.get(`/lemezek/${id}`)
            .then(resp =>{
                this.selectedLemez = resp.data.data;
            })
            .catch(err =>{
                this.errors.status = err.response.status;
            });
        },

    }
});

export const useUserStore = defineStore('UsersStore',{
    state: ()=>({ 
        user:{},
        errors:{
            nev:null,
            email:null,
            jelszo:null,
            status:null
        }
     }),
    getters:{},
    actions:{
        getUser(id){
            Axios.get(`/task/${id}`)
                .then(resp =>{
                    this.user = resp.data;
                })
                .catch(err =>{
                    this.errors.status = err.response.status;
                });
        },
        RegisterUser(userData){
            return Axios.post('/auth/register', userData)
                .then(() => {
                   
                    return;
                })
                .catch((err) => {
                    console.log(err);
                    this.errors = {
                        nev: err.response.data.nev || null,
                        email: err.response.data.email || null,
                        jelszo: err.response.data.jelszo || null,
                        status: err.response.state || null
                    }
                    return Promise.reject(err);
                })
        }
    }
});
