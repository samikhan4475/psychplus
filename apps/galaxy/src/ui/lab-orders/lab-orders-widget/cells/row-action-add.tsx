'use client'

import { IconButton } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'

const RowActionAdd = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <PlusCircleIcon color="black" height="16" width="16" />
    </IconButton>
  )
}

export { RowActionAdd }
