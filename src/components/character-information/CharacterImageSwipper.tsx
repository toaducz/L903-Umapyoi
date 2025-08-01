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
        className="rounded-lg"
      >
        {images.map((outfit, index) => (
            <SwiperSlide key={`${index}`}>
              <Image
                unoptimized
                src={outfit.images[0].image}
                alt={outfit.label_en}
                width={300}
                height={300}
                className="object-contain w-full h-"
              />
              <p className="text-center text-sm text-gray-600 dark:text-gray-300 font-[--font-noto-sans-jp] mt-2">
                {outfit.label_en}
              </p>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
}