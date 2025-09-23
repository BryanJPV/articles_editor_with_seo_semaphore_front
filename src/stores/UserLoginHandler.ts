import { defineStore } from 'pinia';

export const userLoginHandler = defineStore('userLoginHandler', {
  state: () => ({
    remember_token: localStorage.getItem('remember_token') || '',
    user_name: '',
    user_name_inicial: '',
  }),

  getters: {
    itIsThereRememberToken: (state: any) => {
      if (state.remember_token !== '' && state.remember_token !== null) {
        return true;
      }
      return false;
    },
  },

  actions: {
    getRememberTokenAction: async function (credentials: any) {
      return await new Promise((resolve, reject) => {
        credentials.axios
          .post('user/login', {
            usermail: credentials.usermail,
            password: credentials.password,
          })
          .then((response: any) => {
            this.remember_token = response.data.data;
            localStorage.setItem('remember_token', this.remember_token);
            resolve(response);
          })
          .catch((error: any) => {
            //console.log(error.response);
            reject(error as Error);
          });
      });
    },
    logout() {
      localStorage.removeItem('remember_token');
      this.remember_token = '';
    },
    changeUserPasswordAction: async function (credentials: any) {
      return await new Promise((resolve, reject) => {
        credentials.axios
          .post('user/change_user_password', {
            old_password: credentials.old_password,
            new_password: credentials.new_password,
            remember_token: this.remember_token,
          })
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            console.log(error.response);
            reject(error as Error);
          });
      });
    },
    getUserData: async function (axios: any) {
      return await new Promise((resolve, reject) => {
        axios
          .get('user/get_user_data', {
            remember_token: this.remember_token,
          })
          .then((response: any) => {
            this.user_name = response.data.data as string;
            this.user_name_inicial = response.data.data.charAt(0).toUpperCase() as string;

            resolve(response);
          })
          .catch((error: any) => {
            console.log(error.response);
            reject(error as Error);
          });
      });
    },
  },
});
