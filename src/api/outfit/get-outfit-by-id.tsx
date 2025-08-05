import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

export type CharacterOutfitImage = {
  image: string
  uploaded: string // ISO date string, e.g. "2024-02-24"
}

export type CharacterOutfit = {
  label: string
  label_en: string
  images: CharacterOutfitImage[]
}

export type CharacterOutfitList = CharacterOutfit[]

type UmaImagesRequest = {
  id: string | number
}

export const getCharacterImages = ({ id }: UmaImagesRequest) => {
  return queryOptions({
    queryKey: ['get-characters-images', id],
    queryFn: () => request<CharacterOutfitList>(`/api/v1/character/images/${id}`, 'GET'),
    retry: 2
  })
}
