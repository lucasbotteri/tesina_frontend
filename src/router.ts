import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import LelSymbolList from '@/components/lelSymbol/LelSymbolList.vue';
import LelSymbolDetail from '@/components/lelSymbol/LelSymbolDetail.vue';
import Login from '@/components/authentication/Login.vue';
import { isLoggedIn } from '@/helper/authentication';

const PUBLIC_PAGES = ['/login'];

Vue.use(Router);


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/simbolos',
      name: 'symbols',
      component: LelSymbolList,
    },
    {
      path: '/simbolos/:id',
      name: 'symbol-detail',
      component: LelSymbolDetail,
    },
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  const authRequired = !PUBLIC_PAGES.includes(to.path);
  if (authRequired && !isLoggedIn()) {
    return next('/login');
  }

  if (isLoggedIn() && to.name === 'login') {
    return next('/');
  }

  next();
});

export default router;
