import { defineStore } from "pinia";
import Axios from '../services/dataservice';

export const useTermekStore = defineStore('TermekekStore', {
  state: () => ({
    termekek: [],
    lemezek: [],
    selectedLemez: [],
    filteredLemezek: [],
    imageUrl:null
  }),
  getters: {},
  actions: {
    getAllTermek() {
      return Axios.get('/termekek')
        .then(resp => {
          this.termekek = resp.data.data;
          //console.log(resp.data);
        })
        .catch(err => {
          return Promise.reject(err);
        })
    },
    getAllLemezek(){
      return Axios.get('/lemezek')
      .then(resp => {
        this.lemezek = resp.data.data;
        //console.log(resp.data);
      })
      .catch(err => {
        return Promise.reject(err);
      })
    },
    getEladoLemezek() {
      return Axios.get('/lemezek')
        .then(resp => {
          //this.lemezek = resp.data.data;
          this.lemezek = []
          resp.data.data.forEach(item => {
            if (item.termekek != '') { this.lemezek.push(item) }

          }
          )
        })
        .catch(err => {
          return Promise.reject(err);
        })
    },
    getLemezById(id) {
      Axios.get(`/lemezek/${id}`)
        .then(resp => {
          this.selectedLemez = resp.data.data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getFilteredLemezByFilter(szuro, kereses) {
      Axios.get(`/lemezek?${szuro}=${kereses}`)
        .then(resp => {
          this.filteredLemezek = resp.data.data;
          // console.log(this.filteredLemezek[0]);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getFilteredEladoLemezByFilter(szuro, kereses){
      Axios.get(`/lemezek?${szuro}=${kereses}`)
      .then(resp => {
        this.filteredLemezek = []
        resp.data.data.forEach(item => {
          if (item.termekek != '') { this.filteredLemezek.push(item) }
        }
        )
        
      })
        .catch(err => {
          return Promise.reject(err);
        });
    },

    async postLemez(lemezData) {
      try {
        const response = await Axios.post(`/lemezek`, lemezData,)
        this.lemezek = response.data.lemezek
        localStorage.setItem('lemezek', JSON.stringify(this.lemezek))
        return this.lemezek
      } catch (error) {
        console.error(error)
        throw error
      }

    },
    async putKepToLemez(id, formData) {
      try {
        const response = await Axios.put(`/lemezek/${id}/photo`, formData)
        this.imageUrl = response.data.imageUrl
      } catch (error) {
        console.error(error)
      }
    },

    async postTermek(termekData, id) {
      try {
        const response = await Axios.post(`/lemezek/${id}/termekek`, termekData,)
        this.termekek = response.data.termekek
        localStorage.setItem('termekek', JSON.stringify(this.termekek))
        return this.termekek
      } catch (error) {
        console.error(error)
        throw error
      }

    },


  }
});

export const usePostStore = defineStore('post', {
  state: () => ({
    postok: [],
    post: [],
    selectedPost: [],
    comment: [],
    filteredPosts: []
  }),
  actions: {
    async postPost(postData) {
      try {
        const response = await Axios.post('/postok', postData,)
        this.post = response.data.post
        localStorage.setItem('post', JSON.stringify(this.post))
        return this.post
      } catch (error) {
        console.error(error)
        throw error
      }

    },

    async postHozzaszolas(commentData, id) {
      try {
        const response = await Axios.post(`/postok/${id}/hozzaszolasok`, commentData,)
        this.comment = response.data.comment
        localStorage.setItem('comment', JSON.stringify(this.comment))
        return this.comment
      } catch (error) {
        console.error(error)
        throw error
      }

    },



    getAllPost() {
      return Axios.get('/postok')
        .then(resp => {
          this.postok = resp.data.data;
          // console.log(resp.data);
        })
        .catch(err => {
          return Promise.reject(err);
        })
    },
    getPostById(id) {
      Axios.get(`/postok/${id}`)
        .then(resp => {
          this.selectedPost = resp.data.data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getFilteredPostByTopic(topic) {
      Axios.get(`/postok?topic=${topic}`)
        .then(resp => {
          this.filteredPosts = resp.data.data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },





  }
});

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    email: null,
    selectedUser:[]
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

    },
    async PostForgotPassword(email) {
      try {
        const response = await Axios.post('/auth/forgotPassword', email)
        this.email = response.data.email
        localStorage.setItem('email', JSON.stringify(this.email))
        return this.email
      } catch (error) {
        console.error(error)
        throw new Error('Hiba történt a jelszó visszaállítása során.')
      }
    },
    getBejelentkezett() {
      // let token = sessionStorage.getItem("token")
      return Axios.get('/auth/me',
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     token: token
        //   }}
      )
        .then(resp => {
          this.user = resp.data.data;
          //console.log(resp.data);
        })
        .catch(err => {
          // return Promise.reject(err);
          console.log(err)
        })
    },
    getVelemeny(id) {
      return Axios.get(`/ratings/${id}`,
      )
        .then(resp => {
          this.selectedUser = resp.data.data;
          //console.log(resp.data);
        })
        .catch(err => {
          // return Promise.reject(err);
          console.log(err)
        })
    },

  }
});

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    email: null,
    password: null
  }),
  actions: {
    login() {
      console.log(email)
      try {
        Axios.post('/auth/login', {
          email: this.email,
          password: this.password
        }).then((response) => {
          this.token = response.data.token
          console.log(response.data)
          $cookies.set('token', this.token)
          sessionStorage.setItem("token", this.token)
        }).catch(err => {
          console.log(err);
        })
        //this.token = response.data.token

        // A sikeres bejelentkezés után elmentjük a token-t a store-ban
      } catch (error) {
        console.error(error)
      }
    },
    logout() {
      let Auth = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
      Axios.get('/auth/logout', Auth)
        .then(resp => {
          this.token = null;
          $cookies.remove('token')
          sessionStorage.removeItem('token')
        })
        .catch(err => {
          return Promise.reject(err);
        })
    },
  }
})