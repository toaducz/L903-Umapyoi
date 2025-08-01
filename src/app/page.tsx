'use client';

import { useEffect, useState } from 'react';
import CharacterGrid from '@/components/CharacterGrid';
import { CharacterInfo, getCharacterList } from '@/api/characters/get-char-list';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/status/loading';
import ErrorComponent from '@/components/status/error';

const CHARACTERS_PER_LOAD = 12;

export default function CharactersPage() {
  const [visibleCharacters, setVisibleCharacters] = useState<CharacterInfo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data: allCharacters, isLoading, isError, error } = useQuery(getCharacterList());

  useEffect(() => {
    console.log('allCharacters:', allCharacters);
    if (allCharacters) {
      setVisibleCharacters(allCharacters.slice(0, CHARACTERS_PER_LOAD));
    }
  }, [allCharacters]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        hasMore
      ) {
        setVisibleCharacters(prev => {
          const next = allCharacters?.slice(prev.length, prev.length + CHARACTERS_PER_LOAD) || [];
          if (prev.length + next.length >= (allCharacters?.length || 0)) setHasMore(false);
          return [...prev, ...next];
        });
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [allCharacters, hasMore]);

  if (isLoading) return <Loading />;
  if (isError) {
    console.error('Query error:', error);
    return <ErrorComponent />;
  }

  console.log('visibleCharacters:', visibleCharacters);
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-400 dark:to-purple-400 animate-[fade-in-down_0.8s_ease-out]">
        L903 Umapyoi
      </h1>
      <div className='px-25 py-10'>
      <CharacterGrid characters={visibleCharacters} />
      </div>
      {hasMore && (
        <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-300 mt-6 animate-pulse">
          Chờ chú nhé Trainer-san...
        </p>
      )}
    </main>
  );
}