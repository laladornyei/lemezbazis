import axios from 'axios';
import { reactive } from 'vue';

const state = reactive({
  isLoggedIn: false,
  token: null,
});

const actions = {
  async login(nev, email, jelszo) {
    const response = await axios.post('/login', { nev, email, jelszo });
    state.token = response.data.token;
    state.isLoggedIn = true;
    axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
  },

  logout() {
    state.token = null;
    state.isLoggedIn = false;
    delete axios.defaults.headers.common['Authorization'];
  },

  isAuthenticated() {
    return state.isLoggedIn;
  },
};

export default {
  state,
  actions,
};
