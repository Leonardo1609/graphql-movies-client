import { CombinedError } from '@urql/vue'
import {
  IMovie,
  IShow,
  MovieOrShow,
} from '../../../interfaces/movieApi.interfaces'
import { defineStore } from 'pinia'
import { query } from '../../../client'
import { searchMoviesQuery, searchShowsQuery } from '../queries'

const searchMovies = async (page: number, queryText: string) => {
  const resp = await query(searchMoviesQuery, {
    page,
    query: queryText,
  })

  return resp
}

const searchShows = async (page: number, queryText: string) => {
  const resp = await query(searchShowsQuery, {
    page,
    query: queryText,
  })

  return resp
}

export const useSearch = defineStore('search', {
  state: (): {
    queryText: string
    type: MovieOrShow
    page: number
    items: Array<IMovie & IShow>
    fetchingFirst: boolean
    fetchingNextPage: boolean
    error: CombinedError | undefined
    totalPages: number
    totalResults: number
  } => ({
    queryText: '',
    type: 'MOVIE',
    page: 1,
    items: [],
    fetchingFirst: false,
    fetchingNextPage: false,
    error: undefined,
    totalPages: 0,
    totalResults: 0,
  }),
  actions: {
    async getFounds() {
      if (this.page === 1) this.fetchingFirst = true
      else this.fetchingNextPage = true
      try {
        if (this.type === 'MOVIE') {
          const resp = await searchMovies(this.page, this.queryText)
          this.error = resp.error

          if (resp.error) return
          if (resp.data?.searchMovies) {
            this.totalPages = resp.data.searchMovies.total_pages
            this.totalResults = resp.data.searchMovies.total_results
            this.items = [...this.items, ...resp.data?.searchMovies.results!]
          }
        } else {
          const resp = await searchShows(this.page, this.queryText)
          this.error = resp.error

          if (resp.error) return
          if (resp.data?.searchShows) {
            this.totalPages = resp.data.searchShows.total_pages
            this.totalResults = resp.data.searchShows.total_results
            this.items = [...this.items, ...resp.data?.searchShows.results!]
          }
        }
      } finally {
        if (this.page === 1) this.fetchingFirst = false
        else this.fetchingNextPage = false
      }
    },
    fetchNextPage() {
      this.page = this.page + 1
      this.getFounds()
    },
    fetchTypeAndQuery(type: MovieOrShow, query: string) {
      this.page = 1
      this.type = type
      this.queryText = query
      this.items = []
      this.getFounds()
    },
  },
})
