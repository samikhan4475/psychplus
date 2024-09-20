import React from 'react'
import { Button } from '@radix-ui/themes'

const ClearButton = () => {
  return (
    <Button
      className="text-pp-black-1 bg-white border-pp-gray-2 border-2 shadow-[0_0_0_1px_white]"
      size="1"
    >
      Clear
    </Button>
  )
}

export { ClearButton }
