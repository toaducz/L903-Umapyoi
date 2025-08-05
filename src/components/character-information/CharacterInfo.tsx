'use client'

import { UmaDetail } from '@/api/characters/get-char-detail'

type Props = {
  character: UmaDetail
}

export default function CharacterInfo({ character }: Props) {
  return (
    <div className='mt-6 space-y-6'>
      {/* Profile */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-[fade-in_0.8s_ease-out]'>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200 font-[--font-noto-sans-jp] mb-4'>Hồ Sơ</h2>
        <p className='text-gray-700 dark:text-gray-300'>{character.profile}</p>
      </div>

      {/* Details */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-[fade-in_0.8s_ease-out]'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200 font-[--font-noto-sans-jp] mb-4'>
            Chi Tiết
          </h2>
          <div className='space-y-3'>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Sinh nhật:</span> {character.birth_month}
              /{character.birth_day}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Chiều cao:</span> {character.height} cm
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Cân nặng:</span> {character.weight}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Cỡ giày:</span> {character.shoe_size}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Vòng ngực:</span> {character.size_b} cm
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Vòng eo:</span> {character.size_w} cm
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Vòng hông:</span> {character.size_h} cm
            </p>
          </div>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-[fade-in_0.8s_ease-out]'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200 font-[--font-noto-sans-jp] mb-4'>Khác</h2>
          <div className='space-y-3'>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Ký túc xá:</span> {character.residence}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Lớp:</span> {character.grade}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Sở trường:</span> {character.strengths}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Sở đoản:</span> {character.weaknesses}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Về tai:</span> {character.ears_fact}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Về đuôi:</span> {character.tail_fact}
            </p>
            <p>
              <span className='font-semibold text-gray-800 dark:text-gray-200'>Về gia đình:</span>{' '}
              {character.family_fact}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
