import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

type StaffType = 'Arranger' | 'Composer' | 'Lyricist' | 'Brass Arranger'

interface StaffMember {
  id: number
  name_en: string
  name_jp: string
  type: StaffType
  vgmdb_id: number
}

type TrackStaff = {
  [key in StaffType]?: StaffMember[]
}

interface Singer {
  chara_image: string | null
  chara_name_en: string
  chara_name_jp: string
  id: number
  preferred_url: string | null
  va_name_en: string
  va_name_jp: string
  vgmdb_id: number | null
}

interface TrackInfo {
  _singers: Singer[]
  _staff: TrackStaff
  base_track_id: number
  id: number
  name_en: string
  name_jp: string
  preview_url: string | null
  slug: string
}

interface Track {
  disc_no: number
  disc_order: number
  runtime: number
  track: TrackInfo
  track_id: number
}

interface RelatedAlbum {
  album_art: string
  apple_music_id: string
  cystore_product_id: string
  id: number
  name_en: string
  name_jp: string
  release_date: number
  slug: string
  vgmdb_id: number
}

export interface AlbumData {
  _discs: Record<string, string>
  _related: RelatedAlbum[]
  _tracks: Track[]
  album_art: string
  apple_music_id: string
  cystore_product_id: string | null
  id: number
  name_en: string
  name_jp: string
  parent_id: number | null
  release_date: number
  slug: string
  vgmdb_id: number
}

export const getMusicAlbumById = ({ albumId }: { albumId: number }) => {
  return queryOptions({
    queryKey: ['get-music-album-by-id', albumId],
    queryFn: () => request<AlbumData>(`/api/v1/music/album/${albumId}`, 'GET'),
    retry: false
  })
}
