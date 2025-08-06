import Image from 'next/image'
import Link from 'next/link'
import { Album } from '@/api/music/get-albums'

interface MusicItemProps {
  album: Album
}

export default function MusicItem({ album }: Readonly<MusicItemProps>) {
  // Convert Unix timestamp to readable date in Vietnamese
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Convert runtime (seconds) to mm:ss format
  const formatRuntime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Link href={`/music/album/${album.id}`}>
      <div className='py-2'></div>
      <div className='relative flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer'>
        <div className='flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative overflow-hidden rounded-l-xl'>
          <Image
            unoptimized
            src={album.album_art}
            alt={album.name_en}
            width={100}
            height={100}
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        </div>
        <div className='flex-1 p-4'>
          <h2 className='text-lg font-bold text-gray-800 dark:text-white truncate'>{album.name_en}</h2>
          <p className='text-sm text-gray-500 dark:text-gray-400 italic truncate'>{album.name_jp}</p>
          <p className='text-xs text-gray-400 dark:text-gray-300 mt-1'>📅 {formatDate(album.release_date)}</p>
          <p className='text-xs text-gray-400 dark:text-gray-300 mt-1'>
            🎵 Số bài hát: {album._tracks?.length || 'Không có dữ liệu'}
          </p>
          {album._tracks?.[0]?._singers?.[0] && (
            <p className='text-xs text-gray-400 dark:text-gray-300 mt-1 truncate'>
              🎤 Mã nương: {album._tracks[0]._singers[0].chara_name_en}
            </p>
          )}
        </div>
        {/* Separate hover box */}
        <div className='absolute left-full top-0 ml-2 w-64 bg-gray-900/90 dark:bg-gray-900/95 text-white p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block'>
          <p className='text-sm font-semibold mb-2 truncate'>Album: {album.name_en}</p>
          {album._tracks?.length > 0 ? (
            <>
              <p className='text-xs font-medium mb-1'>Bài hát:</p>
              <ul className='text-xs list-disc list-inside max-h-24 overflow-y-auto'>
                {album._tracks.slice(0, 3).map(track => (
                  <li key={track.id} className='truncate'>
                    {track.name_en} ({formatRuntime(track.runtime)})
                  </li>
                ))}
                {album._tracks.length > 3 && (
                  <li className='text-gray-300'>...và {album._tracks.length - 3} bài khác</li>
                )}
              </ul>
              {album._tracks[0]?._singers?.length > 0 && (
                <>
                  <p className='text-xs font-medium mt-2 mb-1'>Mã nương:</p>
                  <ul className='text-xs list-disc list-inside'>
                    {album._tracks[0]._singers.slice(0, 2).map(singer => (
                      <li key={singer.id} className='truncate'>
                        {singer.chara_name_en} (VA: {singer.va_name_en})
                      </li>
                    ))}
                    {album._tracks[0]._singers.length > 2 && (
                      <li className='text-gray-300'>
                        ...và {album._tracks[0]._singers.length - 2} mã nương khác
                      </li>
                    )}
                  </ul>
                </>
              )}
            </>
          ) : (
            <p className='text-xs text-gray-300'>Không có dữ liệu bài hát</p>
          )}
        </div>
        <div className='absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          Xem Album
        </div>
      </div>
    </Link>
  )
}