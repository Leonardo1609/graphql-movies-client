<script setup lang="ts">
import {
  ICreditsResp,
  IMovie,
  IVideosResp,
} from '../../../interfaces/movieApi.interfaces'
import { gql } from '@urql/core'
import { useQuery } from '@urql/vue'
import { useRoute } from 'vue-router'
import { getBackdrop, getPoster } from '../../../helpers/items'
import { computed, onMounted, onUpdated, ref, watch } from 'vue'
import FastAverageColor from 'fast-average-color'
const fac = new FastAverageColor()

const route = useRoute()

const { data, fetching, error, resume } = useQuery<{
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
  pause: true,
})

const backdropImage = ref<string>('')
const backdropAvgColor = ref<string>('')
const overview = ref<HTMLParagraphElement>()
const overviewNoClamped = ref<boolean>(false)
const showCompleteOverview = ref<boolean>(false)

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

const handleShowCompleteOverview = (value: boolean) => {
  showCompleteOverview.value = value
}

const trailerUrl = computed(() => {
  const trailer = data.value?.getVideos.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  )

  if (!trailer) return null
  return `https://www.youtube.com/watch?v=${trailer.key}`
})

onMounted(async () => {
  resume()
})

// This watcher only runs once
watch(overview, (current) => {
  if (current) {
    overviewNoClamped.value = current.scrollHeight === current.clientHeight
  }
})

onUpdated(async () => {
  if (data.value?.getMovie) {
    backdropImage.value = getBackdrop(data?.value?.getMovie.backdrop_path!)
    backdropAvgColor.value = (await fac.getColorAsync(backdropImage.value)).hexa
  }
})
</script>

<template>
  <template v-if="data?.getMovie">
    <div class="relative min-h-[400px] md:min-h-[500px]">
      <img
        class="absolute z-0 object-cover object-top w-full h-full"
        :src="backdropImage"
        :alt="data.getMovie.title"
      />
      <div
        class="absolute top-0 left-0 z-10 w-full h-full opacity-80 brightness-[0.3]"
        :style="{ backgroundColor: backdropAvgColor }"
      ></div>
      <div class="relative top-0 left-0 z-20 w-full h-full app-container">
        <div class="z-20 w-full grid grid-cols-6 gap-4">
          <div class="col-span-4">
            <div class="w-full md:w-3/4">
              <h1 class="text-xl font-bold text-gray-200 md:text-3xl leading-6">
                {{ film?.title }}
              </h1>
              <div class="mt-2 text-gray-300 leading-6">
                <span class="block text-sm">DIRECTED BY</span>
                <strong class="block text-md">{{ director?.name }}</strong>
              </div>
              <div class="flex justify-between mt-2 text-md">
                <p class="text-sm text-gray-300">
                  {{ film?.release_date?.toString().slice(0, 4) }}&nbsp;&nbsp;
                  {{ film?.runtime }} mins
                </p>
                <a
                  v-if="trailerUrl"
                  :href="trailerUrl"
                  target="_blank"
                  class="text-sm font-bold text-gray-200"
                  >TRAILER</a
                >
              </div>
            </div>
          </div>
          <img
            class="h-full col-span-2"
            :src="getPoster(film?.poster_path!)"
            :alt="data.getMovie.title"
          />
        </div>
        <div class="mt-3">
          <p class="mt-2 text-sm font-bold text-gray-300 uppercase">
            {{ film?.tagline }}
          </p>
          <p
            class="mt-2 text-sm text-gray-200 leading-5 md:line-clamp-none"
            :class="{ 'line-clamp-3': !showCompleteOverview }"
            ref="overview"
          >
            {{ film?.overview }}
          </p>
          <template v-if="!overviewNoClamped">
            <button
              v-if="!showCompleteOverview"
              class="text-sm font-bold text-gray-400"
              @click="handleShowCompleteOverview(true)"
            >
              More...
            </button>
            <button
              v-else
              class="text-sm font-bold text-gray-400"
              @click="handleShowCompleteOverview(false)"
            >
              Less...
            </button>
          </template>
        </div>
      </div>
    </div>
    <main class="w-full app-container"></main>
  </template>
</template>

<style scoped></style>
