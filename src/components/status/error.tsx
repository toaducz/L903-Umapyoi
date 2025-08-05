'use client'

import Image from 'next/image'
import danstu_flame from '@/assets/gif/dantsu-flame-eating.gif'

export default function ErrorComponent() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center'>
      <Image unoptimized src={danstu_flame} alt='Error' className='w-56 h-56 mb-4' />
      <p className='text-lg font-semibold text-red-600'>Lỗi rồi Trainer-san!</p>
    </div>
  )
}
