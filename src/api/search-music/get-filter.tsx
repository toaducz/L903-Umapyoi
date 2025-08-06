import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

export type MusicFilterResponse = {
  album: {
    display: string;
    id: string;
  }[];
};

export const getMusicFilters = () => {
  return queryOptions({
    queryKey: ['get-music-filters'],
    queryFn: () => request<MusicFilterResponse>(`/api/v1/music/filters`, 'GET'),
    retry: false
  });
};