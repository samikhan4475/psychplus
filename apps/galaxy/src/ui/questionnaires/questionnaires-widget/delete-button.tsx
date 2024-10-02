'use client'

import { Button } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'

const DeleteButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <Trash2Icon color="black" height="17" width="17" />
    </Button>
  )
}

export { DeleteButton }
