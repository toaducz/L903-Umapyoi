import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

export type CharacterInfo = {
  category_label: string;
  category_label_en: string;
  category_value: string;
  color_main: string;
  color_sub: string;
  id: number;
  name_en: string;
  name_en_internal: string;
  name_jp: string;
  preferred_url: string;
  row_number: number;
  thumb_img: string;
};

type getCharacterListResponse = CharacterInfo[]

export const getCharacterList = () => {
  return queryOptions({
    queryKey: ['get-characters-list'],
    queryFn: () =>
      request<getCharacterListResponse>('/api/v1/character/list', 'GET'),
  });
};
