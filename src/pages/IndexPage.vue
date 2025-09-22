<template>
  <q-page class="q-pa-md flex items-center">
    <div style="width: 100%" class="row items-center justify-center">
      <div class="q-pa-sm" v-for="link in essentialLinks" v-bind:key="link.title">
        <EssentialLinkCard
          :title="link.title == undefined ? '' : link.title"
          :icon="link.icon == undefined ? '' : link.icon"
          :link="link.link == undefined ? '' : link.link"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { EssentialLinkProps } from '../components/EssentialLinkCard.vue';
import EssentialLinkCard from 'components/EssentialLinkCard.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Noticias',
    icon: 'newspaper',
    link: '/noticias',
  },
];
</script>
