'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { CharacterOutfitList } from '@/api/outfit/get-outfit-by-id';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  images: CharacterOutfitList;
};

export default function CharacterImageSwipper({ images }: Readonly<Props>) {
  if (!images || images.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-300 font-[--font-noto-sans-jp]">
        Không có hình ảnh outfit nào.
      </p>
    );
  }

  return (
    <div className="w-full max-w-[300px] animate-[fade-in_0.8s_ease-out]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg"
      >
        {images.map((outfit, index) => (
          outfit.images.map((img, imgIndex) => (
            <SwiperSlide key={`${index}-${imgIndex}`}>
              <Image
                unoptimized
                src={img.image}
                alt={outfit.label_en}
                width={300}
                height={300}
                className="object-contain w-full h-auto"
              />
              <p className="text-center text-sm text-gray-600 dark:text-gray-300 font-[--font-noto-sans-jp] mt-2">
                {outfit.label}
              </p>
            </SwiperSlide>
          ))
        ))}
      </Swiper>
    </div>
  );
}