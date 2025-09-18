import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/noticias',
        component: () => import('src/pages/NoticiasPage.vue'),
      },
    ],
    // Rutas que necesitan Validación del Token mediante los Router Guards
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
    meta: {
      requiresAuth: false,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
