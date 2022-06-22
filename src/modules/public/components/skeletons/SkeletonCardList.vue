<script setup lang="ts">
import SkeletonCard from './SkeletonCard.vue'
const nArray = [...Array(12).keys()]
</script>

<template>
  <ul class="grid grid-cols-6 gap-4">
    <li v-for="n in nArray" :key="n" class="col-span-2 md:col-span-1">
      <SkeletonCard />
    </li>
  </ul>
</template>

<style scoped></style>
