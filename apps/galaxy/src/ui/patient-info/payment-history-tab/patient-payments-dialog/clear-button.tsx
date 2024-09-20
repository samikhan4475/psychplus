'use client'

import { Button } from '@radix-ui/themes'

const ClearButton = () => {
  return (
    <Button
      color="gray"
      variant="outline"
      size="1"
      className="text-black"
      type="button"
    >
      Clear
    </Button>
  )
}

export { ClearButton }
