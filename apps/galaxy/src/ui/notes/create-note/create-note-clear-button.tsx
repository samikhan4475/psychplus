'use client'

import { Button } from '@radix-ui/themes'

const CreateNoteClearButton = () => {
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      type="button"
    >
      Clear
    </Button>
  )
}

export { CreateNoteClearButton }
