'use client';

import { LabelValue } from '@/api/get-videos-by-id';

type Props = {
  movies: LabelValue[];
};

export default function CharacterVideo({ movies }: Readonly<Props>) {

  if (!movies || movies.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-300 font-[--font-noto-sans-jp]">
        
      </p>
    );
  }

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-[fade-in_0.8s_ease-out]">
      <div className="space-y-4">
        {movies.map((movie, index) => (
          <div key={index} className='flex items-center justify-center py-2'>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${movie.value}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full max-w-[600px] rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}