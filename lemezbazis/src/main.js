import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import header from "./components/Header.vue";
import footer from "./components/Footer.vue";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';


Vue.component('Header', header)
Vue.component('Footer', footer)

const app = createApp(App);

app.use(router);

app.mount("#app");
