<script setup lang="ts">
import {
  IMovie,
  IShow,
  MovieOrShow,
} from '../../../interfaces/movieApi.interfaces'
import { getPoster } from '../../../helpers/items'

defineProps<{
  item: IMovie & IShow
  type: MovieOrShow
}>()
</script>

<template>
  <router-link
    :to="{
      name: type === 'MOVIE' ? 'filmPage' : 'showPage',
      params: { id: item.id },
    }"
  >
    <img
      class="h-full"
      :src="getPoster(item.poster_path!)"
      :alt="item.title || item.name"
    />
  </router-link>
</template>
