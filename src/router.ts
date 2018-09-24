import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import SymbolList from '@/components/symbol/SymbolList.vue';
import Login from '@/components/authentication/Login.vue';
import { isLoggedIn } from '@/helper/authentication';

const PUBLIC_PAGES = ['/login'];

Vue.use(Router);


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/simbolos',
      name: 'symbols',
      component: SymbolList,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  const authRequired = !PUBLIC_PAGES.includes(to.path);
  if (authRequired && !isLoggedIn) {
    return next('/login');
  }

  if (isLoggedIn && to.name === 'login') {
    return next('/');
  }

  next();
});

export default router;
