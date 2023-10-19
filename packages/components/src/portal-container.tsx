'use client'

import { useState } from 'react'
import { cn } from '@psychplus/ui/cn'
import { WidgetLoading } from '.'

const PortalContainer = ({ src }: { src: string }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="h-full w-full rounded-md border shadow-md">
      {!loaded ? <WidgetLoading /> : null}
      <iframe
        src={src}
        className={cn('hidden h-full w-full', { block: loaded })}
        onLoad={() => {
          setLoaded(true)
        }}
      ></iframe>
    </div>
  )
}

export { PortalContainer }
