import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

export type Singer = {
  chara_image: string
  chara_name_en: string
  chara_name_jp: string
  id: number
  preferred_url: string
  va_name_en: string
  va_name_jp: string
  vgmdb_id: number
}

export type Track = {
  _singers: Singer[]
  disc_no: number
  disc_order: number
  id: number
  name_en: string
  name_jp: string
  preview_url: string
  runtime: number
  slug: string
}

export type Album = {
  _tracks: Track[]
  album_art: string
  apple_music_id: string | null
  cystore_product_id: string | null
  id: number
  name_en: string
  name_jp: string
  release_date: number // Unix timestamp
  slug: string
  vgmdb_id: number
}

export const getMusicAlbums = ({ page }: { page: number }) => {
  return queryOptions({
    queryKey: ['get-music-albums', page],
    queryFn: () => request<Album[]>(`/api/v1/music/min/albums/${page}`, 'GET'),
    retry: false // hoặc retry: 1 nếu bạn muốn thử lại 1 lần duy nhất
  })
}
