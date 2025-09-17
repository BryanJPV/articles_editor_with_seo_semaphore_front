import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance, AxiosError } from 'axios';
import { Notify } from 'quasar';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

interface ErrorResponse {
  error: string[];
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
//const api = axios.create({ baseURL: 'https://api.example.com' });

const interceptor = (error: AxiosError<ErrorResponse>) => {
  //console.log(error.response.status);
  if (error.response?.status !== undefined && error.response?.status !== null) {
    if (error.response?.status === 403) {
      try {
        Notify.create({
          type: 'negative',
          message:
            error.response.data?.error?.[0] ||
            'Su sesión ha expirado, por favor inicie sesión de nuevo',
          position: 'top',
        });

        window.location.href = '#/login';
        return Promise.reject(error as Error);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          console.log(error.response);
        }

        localStorage.removeItem('remember_token');
      }
    } else {
      return Promise.reject(error as Error);
    }
  }
};

const api = axios.create({ baseURL: process.env.BACKEND_URL + 'api/' });
const axios_aux = axios.create({ baseURL: process.env.BACKEND_URL + 'api/admin/' });
axios.defaults.baseURL = process.env.BACKEND_URL + 'api/admin/';

// Interceptors para validar los casos de error en el que el backend detecte que se le envio un token expirado, entonces retorna un error 403
// en la gestión del error del interceptors se retorna al usuario al Login y se lo avisa mediante el notify que debe logearse de nuevo
axios.interceptors.response.use((response) => response, interceptor);
api.interceptors.response.use((response) => response, interceptor);
axios_aux.interceptors.response.use((response) => response, interceptor);

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$axios_aux = axios_aux;
});

export { api, axios_aux };
