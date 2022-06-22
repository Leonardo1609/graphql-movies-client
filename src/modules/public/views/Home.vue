<script setup lang="ts">
import { gql, useQuery } from '@urql/vue'
import {
  INowPlayingMoviesResp,
  IShowsInAiringResp,
} from '../../../interfaces/movieApi.interfaces'
import CarouselItems from '../components/CarouselItems.vue'
import SkeletonCarousel from '../components/skeletons/SkeletonCarousel.vue'

const { data, fetching, error } = useQuery<{
  getNowPlayingMovies: INowPlayingMoviesResp
  getShowsInAiring: IShowsInAiringResp
}>({
  query: gql`
    query GetPopular {
      getNowPlayingMovies {
        ...Popular
      }

      getShowsInAiring {
        ...Popular
      }
    }

    fragment Popular on IStandardApiResp {
      page
      total_pages
      total_results
      ... on IStandardMovieApiResp {
        results {
          ...FItem
        }
      }

      ... on IStandardShowApiResp {
        results {
          ...FItem
        }
      }
    }

    fragment FItem on Item {
      adult
      backdrop_path
      id
      poster_path
      ... on Movie {
        title
        release_date
      }

      ... on Show {
        name
        last_air_date
      }
    }
  `,
})
</script>

<template>
  <section class="py-5 md:py-10 app-container">
    <h3 class="mb-4 text-lg font-bold text-gray-200 md:text-2xl">
      What's Popular in Theaters
    </h3>
    <template v-if="!fetching && data?.getNowPlayingMovies.results">
      <CarouselItems :items="data.getNowPlayingMovies.results" type="MOVIE" />
    </template>
    <SkeletonCarousel v-if="fetching" />
    <h3 class="mt-6 mb-4 text-lg font-bold text-gray-200 md:mt-10 md:text-2xl">
      What's Popular on TV
    </h3>
    <template v-if="!fetching && data?.getShowsInAiring.results">
      <CarouselItems :items="data.getShowsInAiring.results" type="TV" />
    </template>
    <SkeletonCarousel v-if="fetching" />
  </section>
</template>
