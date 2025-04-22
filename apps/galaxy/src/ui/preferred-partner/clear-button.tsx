import React from 'react'
import { Button } from '@radix-ui/themes'

const ClearButton = () => {
  const onClear = () => {
    // will be implemented later on
  }
  return (
    <Button
      size="1"
      color="gray"
      className="text-black"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export default ClearButton
