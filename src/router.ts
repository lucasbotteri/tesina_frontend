import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import LelSymbolDetail from '@/components/lelSymbol/LelSymbolDetail.vue';
import UserList from '@/components/user/UserList.vue';
import ProjetList from '@/components/project/ProjectList.vue';
import ProjectDetail from '@/components/project/ProjectDetail.vue';
import Login from '@/components/authentication/Login.vue';
import { isLoggedIn, isAdmin } from '@/helper/authentication';

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
      path: '/simbolos/:id',
      name: 'symbol-detail',
      component: LelSymbolDetail,
    },
    {
      path: '/proyectos',
      name: 'projects',
      component: ProjetList,
    },
    {
      path: '/proyectos/:id',
      name: 'project-detail',
      component: ProjectDetail,
    },
    {
      path: '/usuarios/',
      name: 'user-list',
      component: UserList,
      meta: {
        mustBeAdmin: true,
      },
    },
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  const authRequired = !PUBLIC_PAGES.includes(to.path);
  if (authRequired && !isLoggedIn()) {
    return next('/login');
  }

  // Not letting loged user to login again
  if (isLoggedIn() && to.name === 'login') {
    return next('/');
  }

  if (to.matched.some((record) => record.meta.mustBeAdmin) && !isAdmin()) {
    return next('/');
  }

  next();
});

export default router;
