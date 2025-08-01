import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'

export type UmaDetail = {
    birth_day: number;
    birth_month: number;
    category_label: string;
    category_label_en: string;
    category_value: string;
    color_main: string;
    color_sub: string;
    date_gmt: string;
    detail_img_pc: string;
    detail_img_sp: string;
    ears_fact: string;
    family_fact: string;
    game_id: number;
    grade: string;
    height: number;
    id: number;
    link: string;
    modified_gmt: string;
    name_en: string;
    name_en_internal: string;
    name_jp: string;
    preferred_url: string;
    profile: string;
    residence: string;
    row_number: number;
    shoe_size: string;
    size_b: number;
    size_h: number;
    size_w: number;
    slogan: string;
    sns_header: string;
    sns_icon: string;
    strengths: string;
    tail_fact: string;
    thumb_img: string;
    voice: string;
    weaknesses: string;
    weight: string;
};

type UmaDetailRequest = {
    id: string | number
}

export const getCharacterDetail = ({ id }: UmaDetailRequest) => {
  return queryOptions({
    queryKey: ['get-characters-detail', id],
    queryFn: () =>
      request<UmaDetail>(`/api/v1/character/${id}`, 'GET'),
  });
};
