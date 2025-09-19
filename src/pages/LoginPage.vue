<template>
  <q-page
    class="row items-center justify-evenly"
    style="
      background: rgb(254, 191, 168);
      background: linear-gradient(143deg, rgba(254, 191, 168, 1) 26%, rgba(133, 248, 216, 1) 100%);
    "
  >
    <q-card>
      <q-card-section class="column items-center">
        <div class="flex justify-center">
          <img src="/img/marker-solid-full.svg" width="200" alt="Logo Dashboard Noticias" />
        </div>
        <div class="text-h6 text-center text-bold">Ingreso Dashboard</div>
        <q-input class="q-mt-sm" label="Mail de Usuario" outlined v-model="usermail" />
        <q-input
          class="q-mt-sm"
          @keyup.enter="login"
          label="Contraseña"
          outlined
          v-model="password"
          type="password"
        />
        <q-btn class="q-mt-sm" color="primary" v-on:click="login">Ingresar</q-btn>
      </q-card-section>
    </q-card>
  </q-page>

  <q-dialog v-model="loadingAxios" persistent>
    <q-spinner color="white" size="5rem"></q-spinner>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { userLoginHandler } from '../stores/UserLoginHandler';

/* import { useQuasar } from 'quasar';
const $q = useQuasar();
 */
export default defineComponent({
  name: 'Login',
  setup() {
    const userLoginStore = userLoginHandler();

    return {
      userLoginStore: userLoginStore,
      loadingAxios: ref<boolean>(false),
      usermail: ref<string>(''),
      password: ref<string>(''),
    };
  },
  mounted() {},
  methods: {
    login() {
      this.loadingAxios = true;

      const credentials = {
        usermail: this.usermail,
        password: this.password,
        axios: this.$axios,
      };

      this.userLoginStore
        .getRememberTokenAction(credentials)
        .then(async (res: any) => {
          this.loadingAxios = false;
          this.$q.notify({
            type: 'positive',
            message: res.data.message,
            position: 'top',
          });

          await this.$router.push('/');
        })
        .catch((err: any) => {
          this.loadingAxios = false;

          // Cuando llega un solo error el valor err.response.data.error será de todas formas un array
          if (err.response.data.error != null) {
            err.response.data.error.forEach((element: any) => {
              //console.log(element[0])
              this.$q.notify({
                type: 'negative',
                message: element,
                position: 'top',
              });
            });
            return;
          }

          this.$q.notify({
            type: 'negative',
            message: 'No se pudo logear o credenciales erroneas, intente más tarde.',
            position: 'top',
          });
        });
    },
  },
  computed: {},
  watch: {},
});
</script>
