<template>
  <q-layout view="hHh lpR fFf" container>
    <q-header>
      <q-toolbar class="bg-white text-black">
        <q-toolbar-title class="text-bold">
          Análisis SEO Legibilidad
          <q-icon class="q-pr-sm" size="1.6rem" :color="colorSemaforo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              role="img"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M2.42 19.81a.11.11 0 1 0 .19.1C5.75 14.5 8.88 17 13.17 14.17c-2.92 0-3.72-1.56-3.72-1.56a7 7 0 0 0 5.26.39c1-.8 2.79-2.64 2.93-6.59a3.44 3.44 0 0 1-2.42.29 4.81 4.81 0 0 0 2.4-1.7 5.85 5.85 0 0 0-2.74-5c.79 10.33-9.17 5.88-11.67 18.29A12.55 12.55 0 0 1 9 11.78c2.83-1.49 5.15-2.93 6-6.71-.64 4.56-2.7 6.25-5.55 7.53-2.66 1.2-5.39 2.68-7.03 7.21z"
              />
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
              semaforoSeoLegibilidadAux.filter((semaforo: any) => semaforo.value === 0).length +
              ')'
            "
            header-class="text-red"
          >
            <q-list dense bordered padding class="rounded-borders">
              <q-item
                clickable
                v-ripple
                v-for="semaforo in semaforoSeoLegibilidadAux.filter(
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
              semaforoSeoLegibilidadAux.filter((semaforo: any) => semaforo.value === 0.5).length +
              ')'
            "
            header-class="text-orange"
          >
            <q-list dense bordered padding class="rounded-borders">
              <q-item
                clickable
                v-ripple
                v-for="semaforo in semaforoSeoLegibilidadAux.filter(
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
              semaforoSeoLegibilidadAux.filter((semaforo: any) => semaforo.value === 1).length +
              ')'
            "
            header-class="text-green"
          >
            <q-list dense bordered padding class="rounded-borders">
              <q-item
                clickable
                v-ripple
                v-for="semaforo in semaforoSeoLegibilidadAux.filter(
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
const { semaforoSeoLegibilidadAux, colorSemaforo } = defineProps<{
  semaforoSeoLegibilidadAux: any[];
  colorSemaforo: string;
}>();
</script>
