'use client';

import { useQuery } from '@tanstack/react-query';
import { getMusicAlbums, Album } from '@/api/music/get-albums';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image'; 
import Link from 'next/link';
import Loading from '@/components/status/loading';
import ErrorComponent from '@/components/status/error';
import { useState } from 'react';

export default function MusicPage() {
  const router = useRouter();
  const { page } = useParams();
  const pageNumber = parseInt(page as string, 10) || 0;
  const [pageInput, setPageInput] = useState(pageNumber + 1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/music/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const { data: albums, isLoading, isError } = useQuery(getMusicAlbums({ page: pageNumber }));

  if (isLoading) return <Loading />;
  if (isError || !albums) return <ErrorComponent />;

  const goToPage = (newPage: number) => {
    if (newPage >= 0) {
      router.push(`/music/${newPage}`);
      setPageInput(newPage + 1);
    }
  };

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPageInput(value === '' ? 0 : parseInt(value, 10));
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPage = pageInput - 1;
    if (!isNaN(newPage) && newPage >= 0) {
      goToPage(newPage);
    } else {
      setPageInput(pageNumber + 1); // Reset to current page if invalid
    }
  };

  // Convert Unix timestamp to readable date in Vietnamese
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Convert runtime (seconds) to mm:ss format
  const formatRuntime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isNextDisabled = albums.length === 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Nhập tên bài hát..."
              className="w-full max-w-md px-4 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-r-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
        <div className="space-y-4">
          {albums.length > 0 ? (
            albums.map((album: Album) => (
              <Link href={`/music/album/${album.id}`} key={album.id}>
                <div className='py-2'></div>
                <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative overflow-hidden rounded-l-xl">
                    <Image
                      unoptimized
                      src={album.album_art}
                      alt={album.name_en}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1 p-4">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">{album.name_en}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic truncate">{album.name_jp}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">📅 {formatDate(album.release_date)}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">
                      🎵 Số bài hát: {album._tracks?.length || 'Không có dữ liệu'}
                    </p>
                    {album._tracks?.[0]?._singers?.[0] && (
                      <p className="text-xs text-gray-400 dark:text-gray-300 mt-1 truncate">
                        🎤 Mã nương: {album._tracks[0]._singers[0].chara_name_en}
                      </p>
                    )}
                  </div>
                  {/* Separate hover box */}
                  <div className="absolute left-full top-0 ml-2 w-64 bg-gray-900/90 dark:bg-gray-900/95 text-white p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block">
                    <p className="text-sm font-semibold mb-2 truncate">Album: {album.name_en}</p>
                    {album._tracks?.length > 0 ? (
                      <>
                        <p className="text-xs font-medium mb-1">Bài hát:</p>
                        <ul className="text-xs list-disc list-inside max-h-24 overflow-y-auto">
                          {album._tracks.slice(0, 3).map((track) => (
                            <li key={track.id} className="truncate">
                              {track.name_en} ({formatRuntime(track.runtime)})
                            </li>
                          ))}
                          {album._tracks.length > 3 && (
                            <li className="text-gray-300">...và {album._tracks.length - 3} bài khác</li>
                          )}
                        </ul>
                        {album._tracks[0]?._singers?.length > 0 && (
                          <>
                            <p className="text-xs font-medium mt-2 mb-1">Mã nương:</p>
                            <ul className="text-xs list-disc list-inside">
                              {album._tracks[0]._singers.slice(0, 2).map((singer) => (
                                <li key={singer.id} className="truncate">
                                  {singer.chara_name_en} (VA: {singer.va_name_en})
                                </li>
                              ))}
                              {album._tracks[0]._singers.length > 2 && (
                                <li className="text-gray-300">...và {album._tracks[0]._singers.length - 2} mã nương khác</li>
                              )}
                            </ul>
                          </>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-gray-300">Không có dữ liệu bài hát</p>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Xem Album
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Không có album nào trên trang này.</p>
          )}
        </div>

        <div className="flex justify-center items-center mt-10 space-x-4">
          <button
            onClick={() => goToPage(Math.max(0, pageNumber - 1))}
            disabled={pageNumber === 0}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Trang trước
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Trang</span>
            <input
              type="number"
              value={pageInput}
              onChange={handlePageInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePageSubmit(e);
                }
              }}
              className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="1"
            />
          </div>
          <button
            onClick={() => goToPage(pageNumber + 1)}
            disabled={isNextDisabled}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Trang sau
          </button>
        </div>
      </div>
    </main>
  );
}