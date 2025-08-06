'use client'

import { Suspense } from 'react'
import SearchPage from '../../page/search-page'
import Loading from '@/components/status/loading'

export default function MusicSearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPage />
    </Suspense>
  )
}
