<script setup lang="ts">
import ItemPageHeader from '../components/ItemPageHeader.vue'
import SkeletonItemPageHeader from '../components/skeletons/SkeletonItemPageHeader.vue'
import RecordButton from '../components/RecordButton.vue'
import {
  ICreditsResp,
  IShow,
  IVideosResp,
} from '../../../interfaces/movieApi.interfaces'
import { gql } from '@urql/core'
import { useQuery } from '@urql/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const { data, fetching, error } = useQuery<{
  getShow: IShow
  getCredits: ICreditsResp
  getVideos: IVideosResp
}>({
  query: gql`
    query GetShow($showId: Int, $type: ItemType) {
      getShow(showId: $showId) {
        adult
        backdrop_path
        id
        poster_path
        first_air_date
        overview
        tagline
        name
        genres {
          id
          name
        }
      }

      getCredits(itemId: $showId, type: $type) {
        crew {
          ...FCast
        }
        cast {
          ...FCast
        }
      }

      getVideos(itemId: $showId, type: $type) {
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
    showId: parseInt(route.params.id.toString()),
    type: 'TV',
  },
})

const show = computed(() => {
  return data.value?.getShow
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
  <template v-if="show && !fetching">
    <ItemPageHeader
      :date="show?.first_air_date?.toString().slice(0, 4)"
      :director="director"
      :item="show"
      :trailerUrl="trailerUrl"
    />
    <main class="w-full app-container"></main>
    <RecordButton
      :item-id="show.id!"
      class="fixed block md:none bottom-16 right-5"
    />
  </template>
  <SkeletonItemPageHeader v-if="fetching" />
</template>
