'use client'

import { IconButton } from '@radix-ui/themes'
import { Paperclip } from 'lucide-react'

const RowResultAttachment = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <Paperclip width={16} height={16} color="black" />
    </IconButton>
  )
}

export { RowResultAttachment }
