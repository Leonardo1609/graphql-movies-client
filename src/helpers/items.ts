const posterPath = 'http://image.tmdb.org/t/p/w300/'
const backdropPath = 'http://image.tmdb.org/t/p/w500'

export const getPoster = (pathImg: string) => {
  return `${posterPath}${pathImg}`
}

export const getBackdrop = (pathImg: string) => {
  return `${backdropPath}${pathImg}`
}
