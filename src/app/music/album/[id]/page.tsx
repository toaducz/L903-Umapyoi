'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/status/loading';
import ErrorComponent from '@/components/status/error';
import { getMusicAlbumById } from '@/api/music/get-detail-album';
import { useState, useRef } from 'react';

export default function AlbumDetailPage() {
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { id } = useParams();
  console.log(id)
  const albumId = parseInt(id as string, 10);

  const { data: album, isLoading, isError } = useQuery(getMusicAlbumById({ albumId }));

  if (isLoading) return <Loading />;
  if (isError || !album) return <ErrorComponent />;

  // Convert Unix timestamp -> ngày vn
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

   // Xử lý phát/tạm dừng âm thanh
  const handlePlayPause = (trackId: number, previewUrl: string | null) => {
    if (!previewUrl) return;

    if (playingTrackId === trackId) {
      // Tạm dừng nếu đang phát bài này
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingTrackId(null);
      }
    } else {
      // Dừng bài hiện tại (nếu có)
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Phát bài mới
      audioRef.current = new Audio(previewUrl);
      audioRef.current.play().catch((error) => {
        console.error('Lỗi phát âm thanh:', error);
      });
      setPlayingTrackId(trackId);
    }
  };

  // Convert runtime (seconds) to mm:ss format
  const formatRuntime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-400 dark:to-purple-400">
            📀 {album.name_en}
          </h1>
        </div>
        <Link
          href="/music/0"
          className="px-12 py-2 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 inline-block line-clamp-1"
        >
          {`<- Quay lại`}
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="flex-shrink-0 w-32 h-32 relative overflow-hidden rounded-xl">
              <Image
                unoptimized
                src={album.album_art}
                alt={album.name_en}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{album.name_en}</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 italic">{album.name_jp}</p>
              <p className="text-sm text-gray-400 dark:text-gray-300 mt-2">
                📅 Ngày phát hành: {formatDate(album.release_date)}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-300 mt-1">
                🎵 Số bài hát: {album._tracks?.length || 'Không có dữ liệu'}
              </p>
              {album._discs && Object.keys(album._discs).length > 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-300 mt-1">
                  💿 Đĩa: {Object.values(album._discs).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Danh sách Bài hát</h2>
        <div className="space-y-4">
          {album._tracks.length > 0 ? (
            album._tracks.map((track) => (
              <div
                key={track.track_id}
                className="relative flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                    {track.track.name_en} (Disc No. {track.disc_no} - {track.disc_order})
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic truncate">{track.track.name_jp}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">
                    ⏱ Thời lượng: {formatRuntime(track.runtime)}
                  </p>
                  {track.track._singers?.[0] && (
                    <p className="text-xs text-gray-400 dark:text-gray-300 mt-1 overflow-hidden ">
                      🎤 Mã nương: {track.track._singers.map((singer) => singer.chara_name_en).join(', ')}
                    </p>
                  )}
                </div>
                 {track.track.preview_url && (
                  <button
                    onClick={() => handlePlayPause(track.track_id, track.track.preview_url)}
                    className="flex-shrink-0 mr-4 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                    title={playingTrackId === track.track_id ? 'Tạm dừng' : 'Nghe thử'}
                  >
                    {playingTrackId === track.track_id ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                )}
                {/*Hover box for cho staff */}
                <div className="absolute left-full top-0 ml-2 w-64 bg-gray-900/90 dark:bg-gray-900/95 text-white p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block">
                  <p className="text-sm font-semibold mb-2 truncate">Bài hát: {track.track.name_en}</p>
                  {track.track._staff && Object.keys(track.track._staff).length > 0 ? (
                    <>
                      <p className="text-xs font-medium mb-1">Staff:</p>
                      <ul className="text-xs list-disc list-inside">
                        {Object.entries(track.track._staff).map(([type, staff]) =>
                          staff.map((member) => (
                            <li key={member.id} className="truncate">
                              {type}: {member.name_en}
                            </li>
                          ))
                        )}
                      </ul>
                    </>
                  ) : (
                    <p className="text-xs text-gray-300">Không có dữ liệu</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Không có bài hát nào.</p>
          )}
        </div>

        {album._related.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-10 mb-4">Album Liên quan</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {album._related.map((related) => (
                <Link href={`/music/album/${related.id}`} key={related.id}>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex-shrink-0 w-24 h-full relative overflow-hidden rounded-t-xl">
                      <Image
                        unoptimized
                        src={related.album_art}
                        alt="album_cover"
                        width={20}
                        height={20}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">{related.name_en}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic truncate">{related.name_jp}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">
                        📅 {formatDate(related.release_date)}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Xem Album
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}