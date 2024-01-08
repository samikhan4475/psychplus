'use client'

import { Box } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { useDialog } from '../hooks'

interface DialogPortalProps {
  src: string
  name: string
}

/**
 * This component that wraps an dialog iframe. It handles displaying the dialog such that
 * it covers the entire page as well as subscribing to relevant dialog events such as
 * :opened and :closed.
 *
 * Non-React applications that also want to embed dialog iframes must provide their own
 * similar container that handles these common concerns.
 */
const DialogPortal = ({ src, name }: DialogPortalProps) => {
  const { open } = useDialog(name)

  return (
    <Box
      className={cn('fixed bottom-0 left-0 right-0 top-0', {
        invisible: !open,
        'pointer-events-none': !open,
      })}
    >
      <iframe title={name} src={src} className="h-full w-full"></iframe>
    </Box>
  )
}

export { DialogPortal }
