'use client'

import { Box } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import {
  usePublishClosePopover,
  useSubscribeLoaded,
  useSubscribeSize,
} from '../hooks'
import { WidgetLoading } from './widget-loading'

interface PortalContainerProps {
  src: string
  name: string
}

/**
 * A component that wraps an iframe and provides basic loading states and
 * ensures that the iframe dimensions expand to fill the available space.
 * It also handles subscribing to and publishing relevant widget events.
 *
 * Non-React applications that also want to embed iframes must provide their own
 * similar container that handles these common concerns.
 */
const PortalContainer = ({ src, name }: PortalContainerProps) => {
  // Listen for widget loaded event.
  const loaded = useSubscribeLoaded(name)

  // Listen for widget size event.
  const size = useSubscribeSize(name)

  // Publish the close popover event.
  usePublishClosePopover(name)

  return (
    <>
      {!loaded ? <WidgetLoading /> : null}
      <Box
        style={{ height: `${size.height}px`, width: `${size.width}px` }}
        className={cn('min-w-full overflow-clip rounded-3 shadow-3', {
          invisible: !loaded,
        })}
      >
        <iframe title={name} src={src} className="h-full w-full"></iframe>
      </Box>
    </>
  )
}

export { PortalContainer }
