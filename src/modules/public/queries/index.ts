import { gql } from '@urql/vue'
import { ISearchShowsResp } from '../../../interfaces/movieApi.interfaces'
import { ISearchMoviesResp } from '../../../interfaces/movieApi.interfaces'

export const fItem = gql`
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
`

export const searchMoviesQuery = gql<
  {
    searchMovies: ISearchMoviesResp
  },
  {
    page: number
    query: string
  }
>`
  query SearchMovies($page: Int, $query: String) {
    searchMovies(page: $page, query: $query) {
      page
      results {
        ...FItem
      }
      total_pages
      total_results
    }
  }
  ${fItem}
`

export const searchShowsQuery = gql<
  {
    searchShows: ISearchShowsResp
  },
  {
    page: number
    query: string
  }
>`
  query SearchShows($page: Int, $query: String) {
    searchShows(page: $page, query: $query) {
      page
      results {
        ...FItem
      }
      total_pages
      total_results
    }
  }
  ${fItem}
`
