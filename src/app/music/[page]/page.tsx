'use client'

import { useQuery } from '@tanstack/react-query'
import { getMusicAlbums, Album } from '@/api/music/get-albums'
import { useRouter, useParams } from 'next/navigation'
import Loading from '@/components/status/loading'
import ErrorComponent from '@/components/status/error'
import { useState } from 'react'
import MusicItem from '@/components/music/MusicItem'

export default function MusicPage() {
  const router = useRouter()
  const { page } = useParams()
  const currentPage = parseInt(page as string, 10) || 0

  const [pageInput, setPageInput] = useState(currentPage + 1)
  const [searchQuery, setSearchQuery] = useState('')

  const { data: albums, isLoading, isError } = useQuery(
    getMusicAlbums({ page: currentPage })
  )

  const goToPage = (newPage: number) => {
    if (newPage >= 0) {
      router.push(`/music/${newPage}`)
      setPageInput(newPage + 1)
    }
  }

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const targetPage = pageInput - 1
    if (!isNaN(targetPage) && targetPage >= 0) {
      goToPage(targetPage)
    } else {
      setPageInput(currentPage + 1)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/music/search?song=${encodeURIComponent(searchQuery)}`)
    }
  }

  if (isLoading) return <Loading />
  if (isError || !albums) return <ErrorComponent />

  const isNextDisabled = albums.length === 0

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12 sm:px-6'>
      <div className='max-w-5xl mx-auto'>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className='mb-8'>
          <div className='flex justify-center'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Nhập tên bài hát...'
              className='w-full max-w-md px-4 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            <button
              type='submit'
              className='px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-r-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300'
            >
              Tìm kiếm
            </button>
          </div>
        </form>

        {/* Album List */}
        <div className='space-y-4'>
          {albums.length > 0 ? (
            albums.map((album: Album) => (
              <MusicItem key={album.id} album={album} />
            ))
          ) : (
            <p className='text-center text-gray-500 dark:text-gray-400'>
              Không có album nào trên trang này.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className='flex justify-center items-center mt-10 space-x-4'>
          <button
            onClick={() => goToPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className='px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
          >
            Trang trước
          </button>

          <form onSubmit={handlePageSubmit} className='flex items-center space-x-2'>
            <span className='text-gray-600 dark:text-gray-300 font-medium'>Trang</span>
            <input
              type='number'
              value={pageInput}
              onChange={(e) =>
                setPageInput(e.target.value === '' ? 0 : parseInt(e.target.value, 10))
              }
              className='w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500'
              min='1'
            />
          </form>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={isNextDisabled}
            className='px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
          >
            Trang sau
          </button>
        </div>
      </div>
    </main>
  )
}
