<script setup lang="ts">
import { IMovie } from '../../../interfaces/movieApi.interfaces'
import { gql } from '@urql/core'
import { useQuery } from '@urql/vue'
import { useRoute } from 'vue-router'
import { getBackdrop, getPoster } from '../../../helpers/items'

const route = useRoute()

const { data, fetching, error } = useQuery<{
  getMovie: IMovie
}>({
  query: gql`
    query GetMovie($movieId: Int) {
      getMovie(movieId: $movieId) {
        adult
        backdrop_path
        genres {
          id
          name
        }
        id
        imdb_id
        original_language
        original_title
        poster_path
        title
      }
    }
  `,
  variables: {
    movieId: parseInt(route.params.id.toString()),
  },
})
</script>

<template>
  <template v-if="data?.getMovie">
    <div class="w-full">
      <img
        class="w-[1000px]"
        :src="getBackdrop(data.getMovie.backdrop_path!)"
        alt="data.getMovie.title"
      />
    </div>
    <main class="w-full">
      <img
        :src="getPoster(data.getMovie.poster_path!)"
        alt="data.getMovie.title"
      />
    </main>
  </template>
</template>
