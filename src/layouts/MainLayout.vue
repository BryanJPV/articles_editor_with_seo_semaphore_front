<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"></q-btn>

        <q-toolbar-title>
          <q-img src="/img/logo.png" style="min-width: 64px; max-width: 64px"></q-img>
          <b class="q-pl-md">
            {{
              essentialLinks.find((route) => route.link == $route.path) == null ? 'Dashboard' : ''
            }}
            {{ essentialLinks.find((route) => route.link == $route.path)?.title }}
          </b>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer elevated v-if="$q.screen.lt.sm">
      <q-toolbar class="flex justify-around">
        <q-tabs style="max-width: 100vw">
          <q-route-tab
            v-for="link in essentialLinks"
            :key="link.title"
            :to="link.link"
            no-caps
            flat
          >
            <div class="flex column items-center q-pt-xs">
              <q-icon :name="link.icon" size="20px"></q-icon>
              <div class="text-caption">{{ link.title }}</div>
            </div>
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="225">
      <q-list>
        <q-item-label header> Secciones </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-dialog v-model="loadingAxios" persistent>
      <q-spinner color="white" size="5rem"></q-spinner>
    </q-dialog>

    <q-dialog v-model="dialogChangeUserPassword" persistent>
      <q-card>
        <q-card-section class="flex no-wrap justify-between items-center bg-white text-black">
          <div class="flex row items-center text-bold">
            <q-icon class="q-mr-sm" color="primary" name="fas fa-user-lock"></q-icon>
            Cambiar Contraseña
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section class="q-pa-md">
          <q-input
            v-model="inputOldPassword"
            outlined
            label="Contraseña Anterior"
            dense
            counter
            maxlength="150"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="vpn_key"></q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="inputNewPassword"
            outlined
            label="Nueva Contraseña"
            dense
            counter
            maxlength="150"
            :type="isPwd2 ? 'password' : 'text'"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="fas fa-lock"></q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-separator />

        <q-card-actions class="flex row justify-end q-px-sm q-pb-sm">
          <q-btn dense class="text-bold" v-close-popup color="black" flat label="Cancelar"></q-btn>
          <q-btn dense class="text-bold q-ml-sm" color="primary" label="Enviar"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useRouter } from 'vue-router';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';

import { axios_aux } from '../boot/axios';

import { useQuasar } from 'quasar';
const $q = useQuasar();

const loadingAxios = ref(false);

// USER PASSWORD UPDATE
const dialogChangeUserPassword = ref(false);
const inputOldPassword = ref('');
const inputNewPassword = ref('');

const isPwd = ref(true);
const isPwd2 = ref(true);

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Noticias',
    icon: 'newspaper',
    link: '/noticias',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
