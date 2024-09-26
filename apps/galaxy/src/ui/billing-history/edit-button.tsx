'use client'

import { IconButton } from '@radix-ui/themes'
import { PencilLine } from 'lucide-react'

const EditButton = () => {
  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      className="text-black mt-[1px]"
    >
      <PencilLine size={14} />
    </IconButton>
  )
}

export { EditButton }
