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
import { useRef } from "react";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const temp = Number(id);
  const { data: character, isLoading, isError, error } = useQuery(getCharacterDetail({ id: temp }));
  const { data: images, isLoading: imagesLoading } = useQuery(getCharacterImages({ id: temp }));
  const { data: movies, isLoading: moviesLoading } = useQuery(getCharacterMovies({ id: temp }));

  if (isLoading || imagesLoading || moviesLoading) return <Loading />;
  if (isError) {
    console.error('Query error:', error);
    return <ErrorComponent />;
  }

  if (!character) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
        <Image
          unoptimized
          src="https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/d34bee3b36f0457f896e851359d0bd00/admirevega_icon.png"
          alt="Error"
          width={120}
          height={120}
          className="mb-6 animate-bounce"
        />
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 font-[--font-noto-sans-jp]">
          Có gì đó sai sai rồi!
        </p>
      </div>
    );
  }

  const playVoice = () => {
    audioRef.current?.play();
  };

  return (
    <main className="min-h-screen relative overflow-hidden pt-16 px-28">
      {/* Background with diagonal split and gradient */}
      <div 
        className="absolute inset-0 z-[-1] bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900"
        style={{
          backgroundImage: `linear-gradient(135deg, ${character.color_main}30 50%, ${character.color_sub}30 50%)`,
          animation: 'gradientShift 15s ease infinite',
        }}
      >
        {/* Subtle particle effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[url('/particles.png')] bg-repeat animate-particle-drift"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:shadow-3xl">
          {/* Left Column: Image and Swipper */}
          <div className="md:w-1/3 flex flex-col items-center">
            <Image
              unoptimized
              src={character.sns_icon}
              alt={character.name_en}
              width={300}
              height={300}
              className="object-contain mb-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
            <CharacterImageSwipper images={images || []} />
          </div>

          {/* Right Column: Info and Video */}
          <div className="md:w-2/3">
            <h1
              className="text-5xl font-extrabold font-[--font-noto-sans-jp] animate-[fade-in_1s_ease-out]"
              style={{ color: character.color_main, textShadow: `2px 2px 4px ${character.color_sub}40` }}
            >
              {character.name_en}
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mt-3 font-[--font-noto-sans-jp]">{character.name_jp}</p>
            <p
              className="text-lg italic mt-3 font-[--font-noto-sans-jp] tracking-wide"
              style={{ color: character.color_sub }}
            >
              {character.slogan}
            </p>
            <CharacterInfo character={character} />
            <CharacterVideo movies={movies || []} />
            <div className="mt-10 flex justify-center gap-6">
              {/* Trang chính thức */}
              <a
                href={character.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-white-800 font-semibold px-8 py-3 rounded-full border-2 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                style={{ borderColor: character.color_main, backgroundColor: `${character.color_main}20` }}
              >
                Trang chính thức
              </a>

              {/* Giọng nói */}
              <button
                onClick={playVoice}
                className="inline-block bg-white text-white-800 font-semibold px-8 py-3 rounded-full border-2 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                style={{ borderColor: character.color_sub, backgroundColor: `${character.color_sub}20` }}
              >
                Nghe giọng nói
              </button>

              {/* Hidden audio tag */}
              <audio ref={audioRef} src={character.voice} preload="auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes particle-drift {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        .animate-particle-drift {
          animation: particle-drift 20s linear infinite;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </main>
  );
}