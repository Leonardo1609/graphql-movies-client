<script setup lang="ts">
import CardItem from './CardItem.vue'
import { IMovie, IShow } from '../../../interfaces/movieApi.interfaces'

defineProps<{ items: Array<IMovie | IShow> }>()
</script>

<template>
  <ul class="grid grid-cols-6 gap-4">
    <li v-for="item in items" :key="item.id" class="col-span-2 md:col-span-1">
      <CardItem :item="item" :type="'MOVIE'" />
    </li>
  </ul>
</template>

<style scoped></style>
