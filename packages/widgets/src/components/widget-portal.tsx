'use client'

import { Box } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import {
  usePublishClosePopover,
  useSubscribeError,
  useSubscribeLoaded,
  useSubscribeSize,
} from '../hooks'
import { WidgetErrorView } from './widget-error'
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
 * similar container that handles these concerns.
 */
const WidgetPortal = ({ src, name }: PortalContainerProps) => {
  const loaded = useSubscribeLoaded(name)
  const error = useSubscribeError(name)
  const size = useSubscribeSize(name)
  usePublishClosePopover(name)

  return (
    <>
      {!loaded && !error ? <WidgetLoading /> : null}
      {error ? <WidgetErrorView /> : null}
      <Box
        style={{
          height: `${size.height}px`,
          width: `${size.width}px`,
        }}
        className={cn('min-w-full overflow-clip shadow-3', {
          invisible: !loaded,
        })}
      >
        <iframe title={name} src={src} className="h-full w-full"></iframe>
      </Box>
    </>
  )
}

export { WidgetPortal }
