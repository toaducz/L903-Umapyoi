'use client'

import { useQuery } from '@tanstack/react-query'
import { getMusicAlbums } from '@/api/music/get-albums'
import { useRouter, useSearchParams } from 'next/navigation'
import Loading from '@/components/status/loading'
import ErrorComponent from '@/components/status/error'
import { useState, Suspense } from 'react'
import MusicItem from '@/components/music/MusicItem'

export default function SearchPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('song') || ''
    const [searchQuery, setSearchQuery] = useState(query)

    // Use page 1 as default for initial search
    const { data: albums, isLoading, isError } = useQuery(
        getMusicAlbums({ page: 1 })
    )

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/music/search?song=${encodeURIComponent(searchQuery)}`)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    // Filter albums based on search query
    const filteredAlbums = albums?.filter(album =>
        album.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.name_jp.toLowerCase().includes(searchQuery.toLowerCase())
        // album._tracks.some(track =>
        //     track.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //     track.name_jp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //     track._singers.some(singer =>
        //         singer?.chara_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //         singer?.chara_name_jp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //         singer?.va_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //         singer?.va_name_jp.toLowerCase().includes(searchQuery.toLowerCase())
        //     )
        // )
    ) || []

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent />

    return (
        <Suspense fallback={<Loading />}>
            <main className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12 sm:px-6'>
                <div className='max-w-5xl mx-auto'>
                    <form onSubmit={handleSearch} className='mb-8'>
                        <div className='flex justify-center gap-2'>
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder='Tìm kiếm album, bài hát, hoặc ca sĩ...'
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
                    <div className='space-y-4'>
                        {filteredAlbums.length > 0 ? (
                            filteredAlbums.map((album) => (
                                <MusicItem key={album.id} album={album} />
                            ))
                        ) : (
                            <p className='text-center text-gray-500 dark:text-gray-400'>
                                {searchQuery
                                    ? `Không tìm thấy kết quả nào cho "${searchQuery}".`
                                    : 'Vui lòng nhập từ khóa để tìm kiếm.'}
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </Suspense>
    )
}