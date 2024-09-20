'use client'

import { Button } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'

const AddCommentButton = () => {
  return (
    <Button
      color="gray"
      size="1"
      className="text-black border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
      variant="outline"
      type="submit"
    >
      <PlusIcon size={14} className="text-pp-gray-3" />
      Add
    </Button>
  )
}

export { AddCommentButton }
