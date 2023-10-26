'use client'

import { useState } from 'react'
import { cn } from '@psychplus/ui/cn'
import { WidgetLoading } from '.'

const PortalContainer = ({ src }: { src: string }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="h-full w-full rounded-2 border border-gray-2 shadow-3">
      {!loaded ? <WidgetLoading /> : null}
      <iframe
        src={src}
        className={cn('hidden h-full w-full rounded-2', { block: loaded })}
        onLoad={() => {
          setLoaded(true)
        }}
      ></iframe>
    </div>
  )
}

export { PortalContainer }
