import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

export type LabelValue = {
  label: string
  value: string
}

type UmaMoviesRequest = {
  id: string | number
}

export const getCharacterMovies = ({ id }: UmaMoviesRequest) => {
  return queryOptions({
    queryKey: ['get-characters-movies', id],
    queryFn: () => request<LabelValue[]>(`/api/v1/character/movies/${id}`, 'GET'),
    retry: 1
  })
}
