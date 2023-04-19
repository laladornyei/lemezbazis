import { defineStore } from "pinia";
import Axios from '../services/dataservice';
import authService from '../services/authService';


export const useTermekStore = defineStore('TermekekStore',{
    state: ()=>({ 
        termekek:[],
        lemezek:[],
        selectedLemezId:null,
        selectedLemez:[],
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
                // console.log(resp.data);
            })
            .catch(err => {
                return Promise.reject(err);
            })
        },
        getLemezById(){ 
            Axios.get(`/lemezek/${this.selectedLemezId}`)
            .then(resp =>{
                this.selectedLemez = resp.data.data;
            })
            .catch(err =>{
                return Promise.reject(err);
            });
        },
        setId(id) {
            this.selectedLemezId = id;
        }

    }
});


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    async register(userData) {
      try {
        const response = await Axios.post('/auth/register', userData)
        this.user = response.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        return this.user
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
})
