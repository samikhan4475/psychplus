'use client'

import { IconButton } from '@radix-ui/themes'
import { Eye } from 'lucide-react'

const RowActionView = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <Eye color="black" height="16" width="16" />
    </IconButton>
  )
}

export { RowActionView }
