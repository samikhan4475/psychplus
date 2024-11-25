'use client'

import { IconButton } from '@radix-ui/themes'
import { SendHorizontal } from 'lucide-react'

const RowActionSend = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <SendHorizontal color="black" width={16} height={16} />
    </IconButton>
  )
}

export { RowActionSend }
