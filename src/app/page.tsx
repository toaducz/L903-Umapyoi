'use client'

import { useState, useMemo } from 'react'
import CharacterGrid from '@/components/CharacterGrid'
import { getCharacterList } from '@/api/characters/get-char-list'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/status/loading'
import ErrorComponent from '@/components/status/error'

export default function CharactersPage() {
  const { data: characters, isLoading, isError, error } = useQuery(getCharacterList())
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCharacters = useMemo(() => {
    if (!characters) return []
    return characters.filter((char) =>
      char.name_en.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [characters, searchTerm])

  if (isLoading) return <Loading />
  if (isError) {
    console.error('Query error:', error)
    return <ErrorComponent />
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8'>
      <h1 className='text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-400 dark:to-purple-400 animate-[fade-in-down_0.8s_ease-out]'>
        L903 Umapyoi
      </h1>

      <div className='flex justify-center mb-8'>
        <input
          type='text'
          placeholder='Tìm nhân vật...'
          className='px-4 py-2 w-full max-w-md rounded-xl border border-gray-300 dark:border-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:text-white'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='px-8'>
        <CharacterGrid characters={filteredCharacters} />
      </div>
    </main>
  )
}
