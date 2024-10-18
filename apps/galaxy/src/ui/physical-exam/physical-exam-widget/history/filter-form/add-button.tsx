'use client'

import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'

const AddButton = () => {
  return (
    <Button
      size="1"
      color="gray"
      className="bg-pp-black-1 text-white cursor-pointer px-3 py-1.5"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <CopyIcon width={16} height={16} />
      Add to Note
    </Button>
  )
}

export { AddButton }
