<script setup lang="ts">
import RecordButton from '../components/RecordButton.vue'
import ItemPageHeader from '../components/ItemPageHeader.vue'
import SkeletonItemPageHeader from '../components/skeletons/SkeletonItemPageHeader.vue'
import {
  ICreditsResp,
  IMovie,
  IVideosResp,
} from '../../../interfaces/movieApi.interfaces'
import { computed } from 'vue'
import { gql } from '@urql/core'
import { useQuery } from '@urql/vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data, fetching, error } = useQuery<{
  getMovie: IMovie
  getCredits: ICreditsResp
  getVideos: IVideosResp
}>({
  query: gql`
    query GetMovie($movieId: Int, $type: ItemType) {
      getMovie(movieId: $movieId) {
        adult
        backdrop_path
        overview
        release_date
        runtime
        tagline
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

      getCredits(itemId: $movieId, type: $type) {
        crew {
          ...FCast
        }
        cast {
          ...FCast
        }
      }

      getVideos(itemId: $movieId, type: $type) {
        results {
          id
          key
          site
          type
        }
      }
    }

    fragment FCast on ItemCast {
      cast_id
      character
      credit_id
      department
      id
      job
      known_for_department
      name
      profile_path
    }
  `,
  variables: {
    movieId: parseInt(route.params.id.toString()),
    type: 'MOVIE',
  },
})

const film = computed(() => {
  return data.value?.getMovie
})

const cast = computed(() => {
  return data.value?.getCredits.cast
})

const crew = computed(() => {
  return data.value?.getCredits.crew
})

const director = computed(() => {
  return crew.value?.find((person) => person.job === 'Director')
})

const trailerUrl = computed(() => {
  const trailer = data.value?.getVideos.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  )

  if (!trailer) return null
  return `https://www.youtube.com/watch?v=${trailer.key}`
})
</script>

<template>
  <template v-if="film && !fetching">
    <ItemPageHeader
      :date="film?.release_date?.toString().slice(0, 4)"
      :director="director"
      :item="film"
      :trailerUrl="trailerUrl"
    />
    <main class="w-full app-container"></main>
    <RecordButton
      :item-id="film.id!"
      class="fixed block md:none bottom-16 right-5"
    />
  </template>
  <SkeletonItemPageHeader v-if="fetching" />
</template>

<style scoped></style>
