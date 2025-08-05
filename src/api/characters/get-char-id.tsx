import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

export type CharacterIDs = {
  game_id: number
  web_id: number
}

type CharacterIDsResponse = {
  data: CharacterIDs[]
}

export const getCharacterAIDs = () => {
  return queryOptions({
    queryKey: ['get-characters-id'],
    queryFn: () => request<CharacterIDsResponse>(`/api/v1/character`, 'GET')
  })
}
