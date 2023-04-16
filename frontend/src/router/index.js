import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue';
import EladasView from '../views/EladasView.vue';
import KozossegView from '../views/KozossegView.vue';
import FeltoltesView from '../views/FeltoltesView.vue';
import BejelentkezesView from '../views/BejelentkezesView.vue';
import SzerkesztesView from '../views/SzerkesztesView.vue';
import KivansagView from '../views/KivansagView.vue';
import KosarView from '../views/KosarView.vue';
import ElfJelszoView from '../views/ElfJelszoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/eladas",
      component: EladasView,
    },
    {
      path: "/kozosseg",
      component: KozossegView,
    },
    {
      path: "/feltoltes",
      component: FeltoltesView,
    },
    {
      path: "/bejelentkezes",
      component: BejelentkezesView,
    },
    {
      path: "/szerkesztes",
      component: SzerkesztesView,
    },
    {
      path: "/kivansag",
      component: KivansagView,
    },
    {
      path: "/kosar",
      component: KosarView,
    },
    {
      path: "/elfelejtett-jelszo",
      component: ElfJelszoView,
    },
  ],
});

export default router;
