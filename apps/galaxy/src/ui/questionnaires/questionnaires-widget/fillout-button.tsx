'use client'

import { Button } from '@radix-ui/themes'

const FilloutButton = () => {
  return (
    <Button
      size="1"
      className="bg-accent-11"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      Fill Out
    </Button>
  )
}

export { FilloutButton }
