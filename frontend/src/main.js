import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia';
import router from './router';
import VueCookies from 'vue-cookies';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './assets/css/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueCookies);
VueCookies.config('7d');

export const piniaStore = createPinia();

app.mount('#app');

