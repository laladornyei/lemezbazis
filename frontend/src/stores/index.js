import { defineStore } from "pinia";
import Axios from '../services/dataservice';

export const useTermekStore = defineStore('TermekekStore',{
    state: ()=>({ 
        termekek:[],
        lemezek:[]
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
        }
    }
});
