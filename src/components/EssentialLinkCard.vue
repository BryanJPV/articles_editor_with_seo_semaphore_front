<template>
  <q-card @click="navTo(link == undefined ? '' : link)" class="cursor-pointer">
    <q-card-section class="column items-center">
      <q-icon :name="icon" size="48px" class="q-pa-md"></q-icon>
      <div class="text-bold text-h6">{{ title }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const router = useRouter();
const navTo = async (ruta: string) => {
  await router.push({ path: ruta });
};
</script>
