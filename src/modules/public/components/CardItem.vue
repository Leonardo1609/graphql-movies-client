<script setup lang="ts">
import {
  IMovie,
  IShow,
  MovieOrShow,
} from '../../../interfaces/movieApi.interfaces'
import { getPoster } from '../../../helpers/items'
import { computed } from 'vue'

const { item } = defineProps<{
  item: IMovie & IShow
}>()

const type = computed<MovieOrShow>(() => {
  return item.title ? 'MOVIE' : 'TV'
})
</script>

<template>
  <router-link
    :to="{
      name: type === 'MOVIE' ? 'filmPage' : 'showPage',
      params: { id: item.id },
    }"
  >
    <div
      class="h-full border-[1.8px] border-gray-200 rounded hover:border-lime-500 max-w-[300px] aspect-[1/1.5]"
    >
      <img
        v-if="item.poster_path"
        class="w-full h-full"
        :src="getPoster(item.poster_path) || ''"
        :alt="item.title || item.name"
      />
      <div
        class="h-full bg-gray-600 grid place-items-center aspect-[1/1.5]"
        v-else
      >
        <img
          class="w-2/3"
          src="/images/no-poster.svg"
          :alt="item.title || item.name"
        />
      </div>
    </div>
  </router-link>
</template>
