<template>
  <q-layout view="hHh lpR fFf" container>
    <q-header>
      <q-toolbar class="bg-white text-black">
        <q-toolbar-title class="text-bold">
          Análisis SEO General
          <q-icon class="q-pr-sm" size="1.6rem" :color="colorSemaforo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              role="img"
              aria-hidden="true"
              focusable="false"
            >
              <defs></defs>
              <path
                class="cls-1"
                d="M13.56 0H7a3.5 3.5 0 0 0-3.34 3.4v13.16A3.41 3.41 0 0 0 7.06 20h6.5A3.41 3.41 0 0 0 17 16.56V3.4A3.51 3.51 0 0 0 13.56 0zm1.9 16.08a2.37 2.37 0 0 1-2.35 2.37H7.52a2.37 2.37 0 0 1-2.35-2.37V3.86a2.37 2.37 0 0 1 2.35-2.37h5.59a2.37 2.37 0 0 1 2.35 2.37z"
              />
              <circle class="cls-1" cx="10.31" cy="9.98" r="2.15" />
              <circle class="cls-1" cx="10.31" cy="4.69" r="2.15" />
              <circle class="cls-1" cx="10.31" cy="15.31" r="2.15" />
            </svg>
          </q-icon>
        </q-toolbar-title>

        <q-btn flat v-close-popup dense icon="close"></q-btn>
      </q-toolbar>
      <q-separator color="grey-8"></q-separator>
    </q-header>

    <q-page-container>
      <q-page class="bg-white q-pa-none">
        <q-card-section class="q-pa-sm text-grey-8">
          <q-expansion-item
            expand-separator
            icon="fas fa-times-circle"
            :label="
              'Problemas (' +
              semaforoSeoGeneralAux.filter((semaforo: any) => semaforo.value === 0).length +
              ')'
            "
            header-class="text-red"
          >
            <q-list dense bordered padding class="rounded-borders">
              <q-item
                clickable
                v-ripple
                v-for="semaforo in semaforoSeoGeneralAux.filter(
                  (semaforo: any) => semaforo.value === 0,
                )"
                v-bind:key="semaforo.index"
              >
                <q-item-section>
                  <div class="flex row items-center">
                    <q-icon class="q-pr-sm" name="circle" color="red" size=".7rem"></q-icon>
                    <b class="q-pr-sm">{{ semaforo.label }}:</b
                    ><span>{{ semaforo.error_msg }}</span>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-sm text-grey-8">
          <q-expansion-item
            expand-separator
            icon="fas fa-exclamation-circle"
            :label="
              'A Mejorar (' +
              semaforoSeoGeneralAux.filter((semaforo: any) => semaforo.value === 0.5).length +
              ')'
            "
            header-class="text-orange"
          >
            <q-list dense bordered padding class="rounded-borders">
              <q-item
                clickable
                v-ripple
                v-for="semaforo in semaforoSeoGeneralAux.filter(
                  (semaforo: any) => semaforo.value === 0.5,
                )"
                v-bind:key="semaforo.index"
              >
                <q-item-section>
                  <div class="flex row items-center">
                    <q-icon class="q-pr-sm" name="circle" color="orange" size=".7rem"></q-icon>
                    <b class="q-pr-sm">{{ semaforo.label }}:</b
                    ><span>{{ semaforo.error_msg }}</span>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-sm text-grey-8">
          <q-expansion-item
            expand-separator
            icon="fas fa-check-circle"
            :label="
              'Buenos Resultados (' +
              semaforoSeoGeneralAux.filter((semaforo: any) => semaforo.value === 1).length +
              ')'
            "
            header-class="text-green"
          >
            <q-list dense bordered padding class="rounded-borders">
              <q-item
                clickable
                v-ripple
                v-for="semaforo in semaforoSeoGeneralAux.filter(
                  (semaforo: any) => semaforo.value === 1,
                )"
                v-bind:key="semaforo.index"
              >
                <q-item-section>
                  <div class="flex row items-center">
                    <q-icon class="q-pr-sm" name="circle" color="green" size=".7rem"></q-icon>
                    <b class="q-pr-sm">{{ semaforo.label }}:</b
                    ><span>{{ semaforo.error_msg }}</span>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-card-section>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const { semaforoSeoGeneralAux, colorSemaforo } = defineProps<{
  semaforoSeoGeneralAux: any[];
  colorSemaforo: string;
}>();
</script>
