'use client'

import { Button } from '@radix-ui/themes'

const FilloutButton = () => {
  return (
    <Button
      size="2"
      className="h-auto bg-accent-11 px-6 py-1"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      Fill Out
    </Button>
  )
}

export { FilloutButton }
