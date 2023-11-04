'use client'

import { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { WidgetLoading } from './widget-loading'

const PortalContainer = ({ src }: { src: string }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Box
      height="100%"
      width="100%"
      className="rounded-2 border border-gray-2 shadow-3"
    >
      {!loaded ? <WidgetLoading /> : null}
      <iframe
        src={src}
        className={cn('hidden h-full w-full rounded-2', { block: loaded })}
        onLoad={() => {
          setLoaded(true)
        }}
      ></iframe>
    </Box>
  )
}

export { PortalContainer }
