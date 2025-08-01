'use client';

import { LabelValue } from '@/api/get-videos-by-id';

type Props = {
  movies: LabelValue[];
};

export default function CharacterVideo({ movies }: Props) {
  if (!movies || movies.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-300 font-[--font-noto-sans-jp]">
        Không có video giới thiệu nào.
      </p>
    );
  }

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-[fade-in_0.8s_ease-out]">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 font-[--font-noto-sans-jp] mb-4">
        Video Giới Thiệu
      </h2>
      <div className="space-y-4">
        {movies.map((movie, index) => (
          <div key={index}>
            <p className="text-gray-700 dark:text-gray-300 font-[--font-noto-sans-jp] mb-2">
              {movie.label}
            </p>
            <video
              controls
              src={movie.value}
              className="w-full max-w-[600px] rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}