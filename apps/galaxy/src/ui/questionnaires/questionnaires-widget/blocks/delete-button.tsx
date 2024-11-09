'use client'

import { Button, Tooltip } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'

const DeleteButton = () => {
  return (
    <Tooltip content="Delete">
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <Trash2Icon color="black" height="14" width="14" />
      </Button>
    </Tooltip>
  )
}

export { DeleteButton }
