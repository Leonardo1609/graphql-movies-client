<script setup lang="ts">
import { gql, useQuery } from '@urql/vue'
import {
  INowPlayingMoviesResp,
  IShowsInAiringResp,
} from '../../../interfaces/movieApi.interfaces'
import CarouselItems from '../components/CarouselItems.vue'

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
  <section class="app-container">
    <h3>What's Popular</h3>
    <h2 class="text-3xl font-bold">Movies</h2>
    <template v-if="!fetching && data?.getNowPlayingMovies.results">
      <CarouselItems :items="data.getNowPlayingMovies.results" type="MOVIE" />
    </template>
    <h2 class="text-3xl font-bold">Shows</h2>
    <template v-if="!fetching && data?.getShowsInAiring.results">
      <CarouselItems :items="data.getShowsInAiring.results" type="TV" />
    </template>
  </section>
</template>
