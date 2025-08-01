'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loading from '@/components/status/loading';
import ErrorComponent from '@/components/status/error';
import { getCharacterDetail } from '@/api/characters/get-char-detail';
import { getCharacterImages } from '@/api/outfit/get-outfit-by-id';
import { getCharacterMovies } from '@/api/get-videos-by-id';
import CharacterImageSwipper from '@/components/character-information/CharacterImageSwipper';
import CharacterVideo from '@/components/character-information/CharacterVideo';
import CharacterInfo from '@/components/character-information/CharacterInfo';
export default function CharacterDetailPage() {
  const { id } = useParams();
  const temp = Number(id);
  const { data: character, isLoading, isError, error } = useQuery(getCharacterDetail({ id: temp }));
  const { data: images, isLoading: imagesLoading, isError: imagesError } = useQuery(getCharacterImages({ id: temp }));
  const { data: movies, isLoading: moviesLoading, isError: moviesError } = useQuery(getCharacterMovies({ id: temp }));

  if (isLoading || imagesLoading || moviesLoading) return <Loading />;
  if (isError || imagesError || moviesError) {
    console.error('Query error:', error);
    return <ErrorComponent />;
  }

  if (!character) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <Image
          unoptimized
          src="https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/d34bee3b36f0457f896e851359d0bd00/admirevega_icon.png"
          alt="Error"
          width={120}
          height={120}
          className="mb-6"
        />
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 font-[--font-noto-sans-jp]">
          Có gì đó sai sai rồi!
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Image and Swipper */}
          <div className="md:w-1/3 flex flex-col items-center">
            <Image
              unoptimized
              src={character.sns_icon}
              alt={character.name_en}
              width={300}
              height={300}
              className="object-contain mb-6 animate-[fade-in_0.8s_ease-out]"
            />
            <CharacterImageSwipper images={images || []} />
          </div>

          {/* Right Column: Info and Video */}
          <div className="md:w-2/3">
            <h1
              className="text-4xl font-bold font-[--font-noto-sans-jp]"
              style={{ color: character.color_main }}
            >
              {character.name_jp}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">{character.name_en}</p>
            <p
              className="text-lg italic mt-2 font-[--font-noto-sans-jp]"
              style={{ color: character.color_sub }}
            >
              {character.slogan}
            </p>
            <CharacterInfo character={character} />
            {/* <CharacterVideo movies={movies || []} /> */}
            <div className="mt-8 flex justify-center gap-4">
              <a
                href={character.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-gray-800 font-semibold px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                style={{ borderColor: character.color_main }}
              >
                Trang chính thức
              </a>
              <a
                href={character.voice}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-gray-800 font-semibold px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                style={{ borderColor: character.color_sub }}
              >
                Giọng nói
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}