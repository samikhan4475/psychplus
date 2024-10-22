'use client'

import { Button } from '@radix-ui/themes'

const RecentNewButton = () => {
  return (
    <Button
      color="gray"
      size="1"
      variant="outline"
      className="text-black disabled:text-gray-5"
    >
      Recent New
    </Button>
  )
}

export { RecentNewButton }
