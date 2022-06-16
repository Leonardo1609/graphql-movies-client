<script setup lang="ts">
import { IShow } from '../../../interfaces/movieApi.interfaces'
import { gql } from '@urql/core'
import { useQuery } from '@urql/vue'
import { useRoute } from 'vue-router'
import { getBackdrop, getPoster } from '../../../helpers/items'

const route = useRoute()

const { data, fetching, error } = useQuery<{
  getShow: IShow
}>({
  query: gql`
    query GetShow($showId: Int) {
      getShow(showId: $showId) {
        adult
        backdrop_path
        id
        poster_path
        name
        genres {
          id
          name
        }
      }
    }
  `,
  variables: {
    showId: parseInt(route.params.id.toString()),
  },
})
</script>

<template>
  <template v-if="data?.getShow">
    <div class="w-full">
      <img
	class="w-full"
        :src="getBackdrop(data.getShow.backdrop_path!)"
        :alt="data.getShow.name"
      />
    </div>
    <main class="w-full">
      <div class="w-[250px] h-[350px]">
        <img
          v-if="data.getShow.poster_path"
          :src="getPoster(data.getShow.poster_path!)"
          :alt="data.getShow.name"
        />
        <div class="h-full bg-gray-600 grid place-items-center" v-else>
          <img
            class="w-2/3"
            src="/images/no-poster.svg"
            :alt="getPoster.name"
          />
        </div>
      </div>
    </main>
  </template>
</template>
