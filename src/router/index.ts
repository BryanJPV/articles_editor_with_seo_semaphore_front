import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { axios_aux } from '../boot/axios';
import { AxiosError } from 'axios';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// Función para verificar la expiración del Token en las validaciones de los RouterGuards
const verify_Token_Expiration = async (remember_token: string): Promise<boolean> => {
  try {
    const res = await axios_aux.post('user/check_token_expiration', {
      remember_token: remember_token,
    });
    return res.data.data as boolean;
  } catch (error) {
    /* console.log(error.response);
    console.log(error.response.data); */
    if (error instanceof AxiosError) {
      console.log(error);
      console.log(error.response);
    }

    localStorage.removeItem('remember_token');
    return true;
  }
};

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    //console.log(0);

    const remember_token: string = localStorage.getItem('remember_token') || '';
    const requiresAuth: boolean = to.matched.some((route) => route.meta.requiresAuth);

    // Si no requiere Login y no tiene token pasa (porque es Login)
    if (!requiresAuth && remember_token == '') {
      //console.log(1);
      next();
      return;
    }

    // Si requiere Login y no tiene token redirije al Login
    if (requiresAuth && remember_token == '') {
      //console.log(2);
      next('/login');
      return;
    }

    const tokenIsExpired: boolean = await verify_Token_Expiration(remember_token);
    // Si ya esta logueado y quiere ir al login, esta condición no le permite
    if (/* !requiresAuth */ to.path === '/login' && tokenIsExpired && remember_token == '') {
      //console.log(4);
      next('/');
      return;
    }

    // Si expiró el token y quiere ir a otra página, redirije al login
    if (requiresAuth && (tokenIsExpired || remember_token == '')) {
      //console.log(5);
      next('/login');
      return;
    }
    //console.log(6);
    // Permite acceder después de todos los filtros anteriores
    next();
  });

  return Router;
});
