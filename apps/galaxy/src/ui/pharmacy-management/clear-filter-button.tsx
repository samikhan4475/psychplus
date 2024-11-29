import React from 'react'
import { Button } from '@radix-ui/themes'

const ClearFilterButton = ({ handleReset }: { handleReset: () => void }) => {
  return (
    <Button
      size="1"
      color="gray"
      className="text-black"
      variant="outline"
      type="button"
      onClick={handleReset}
    >
      Clear
    </Button>
  )
}

export { ClearFilterButton }
