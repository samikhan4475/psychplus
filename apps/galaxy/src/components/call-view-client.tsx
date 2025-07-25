'use client'

import dynamic from 'next/dynamic'

const CallView = dynamic(
  () => import('@/ui/call/call-view.tsx').then((mod) => mod.CallView),
  {
    ssr: false,
  },
)

export { CallView }