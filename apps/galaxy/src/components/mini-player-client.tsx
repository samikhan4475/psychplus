'use client'

import dynamic from 'next/dynamic'

const MiniPlayer = dynamic(
  () =>
    import('@/ui/call/blocks/mini-player.tsx').then((mod) => mod.MiniPlayer),
  {
    ssr: false,
  },
)

export { MiniPlayer }
