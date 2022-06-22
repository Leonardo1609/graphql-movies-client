const posterPath = 'http://image.tmdb.org/t/p/w300/'
const backdropPath = 'http://image.tmdb.org/t/p/w500'

export const getPoster = (pathImg: string) => {
  return pathImg?.length ? `${posterPath}${pathImg}` : null
}

export const getBackdrop = (pathImg: string) => {
  return pathImg?.length ? `${backdropPath}${pathImg}` : null
}
