'use client'

import CharacterGrid from '@/components/CharacterGrid'
import { CharacterInfo, getCharacterList } from '@/api/characters/get-char-list'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/status/loading'
import ErrorComponent from '@/components/status/error'

export default function CharactersPage() {
  const { data: characters, isLoading, isError, error } = useQuery(getCharacterList())

  if (isLoading) return <Loading />
  if (isError) {
    console.error('Query error:', error)
    return <ErrorComponent />
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8'>
      <h1 className='text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-400 dark:to-purple-400 animate-[fade-in-down_0.8s_ease-out]'>
        L903 Umapyoi
      </h1>
      <div className='px-25 py-10'>
        <CharacterGrid characters={characters ?? []} />
      </div>
    </main>
  )
}
