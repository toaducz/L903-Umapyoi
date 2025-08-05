import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

export interface Album {
  album_art: string
  apple_music_id: string
  cystore_product_id: string | null
  disc_no: number
  disc_order: number
  id: number
  name_en: string
  name_jp: string
  release_date: number // Unix timestamp
  runtime: number // seconds
  slug: string
  vgmdb_id: number
}

export interface Singer {
  chara_image: string
  chara_name_en: string
  chara_name_jp: string
  id: number
  preferred_url: string
  va_name_en: string
  va_name_jp: string
  vgmdb_id: number
}

export interface Track {
  _albums: Album[]
  _singers: Singer[]
  id: number
  name_en: string
  name_jp: string
  preview_url: string
  slug: string
}

export interface MusicData {
  albums: Album[] // Hiện tại mảng albums gốc rỗng, có thể thay đổi về sau
  tracks: Track[]
}

interface GetFilteredMusicTracksRequest {
  song: string
  character?: string
}

export const getFilteredMusicTracks = ({ song, character }: GetFilteredMusicTracksRequest) => {
  return queryOptions({
    queryKey: ['get-filtered-music-tracks', song, character],
    queryFn: () =>
      request<Track[]>(`/api/v1/music/filter`, 'GET', {
        song,
        ...(character ? { character } : {})
      }),
    retry: false
  })
}
