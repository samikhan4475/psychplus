'use client'

import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'

const TrashButton = () => {
  return (
    <IconButton variant="ghost" color="gray" size="1" type="button">
      <Trash2 size={16} />
    </IconButton>
  )
}

export { TrashButton }
