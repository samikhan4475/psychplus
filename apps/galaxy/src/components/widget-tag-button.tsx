'use client'

import { Button } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'

const WidgetTagButton = () => {
  return (
    <Button
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <PlusIcon height={16} width={16} />
      Tag
    </Button>
  )
}

export { WidgetTagButton }
