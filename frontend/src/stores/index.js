import { defineStore } from "pinia";
import Axios from '../services/dataservice';

export const useTermekStore = defineStore('TermekekStore',{
    state: ()=>({ 
        termekek:[],
        lemezek:[],
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
        getLemezById(id){ 
            Axios.get(`/lemezek/${id}`)
            .then(resp =>{
                this.selectedLemez = resp.data.data;
            })
            .catch(err =>{
                return Promise.reject(err);
            });
        },
        setId(id) {
            this.selectedLemezId = id;
        },
        createLemez(lemez) {
          return Axios.post('/lemezek', lemez)
              .then(resp => {
                  return resp.data;
              })
              .catch(err => {
                  return Promise.reject(err);
              });
      }

    }
});


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async PostUser(userData) {
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

export const useAuthStore = defineStore('auth',{
    state: () => ({
      token: null,
    }),
    actions: {
      async login(email, password) {
        try {
          const response = await Axios.post('/auth/login', {
            email: email,
            password: password
          })
          this.token = response.data.token
          // A sikeres bejelentkezés után elmentjük a token-t a store-ban
        } catch (error) {
          console.error(error)
        }
      },
      logout(){
        return Axios.get('/auth/logout')
        .then(resp =>{
            this.token = response.data.token;
        })
        .catch(err => {
            return Promise.reject(err);
        })
    },
    }
  })
