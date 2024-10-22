'use client'

import { Button } from '@radix-ui/themes'

const NoFollowUpButton = () => {
  return (
    <Button
      color="gray"
      size="1"
      variant="outline"
      className="text-black disabled:text-gray-5"
    >
      No Follow-Up
    </Button>
  )
}

export { NoFollowUpButton }
