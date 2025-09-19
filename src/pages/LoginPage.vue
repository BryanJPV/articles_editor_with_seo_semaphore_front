<template>
  <q-page
    class="row items-center justify-evenly"
    style="
      background: rgb(27, 119, 186);
      background: linear-gradient(143deg, rgba(27, 119, 186, 1) 26%, rgba(243, 186, 5, 1) 100%);
    "
  >
    <q-card>
      <q-card-section class="column items-center">
        <div class="flex justify-center">
          <img src="/img/logo.png" width="200" alt="Logo Dashboard Noticias" />
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

<script lang="ts"></script>
