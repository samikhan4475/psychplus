'use client'

import { Button } from '@radix-ui/themes'

const UpdateButton = () => {
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      className=" border-pp-gray-2 text-black flex-1 border border-solid text-1 font-medium !outline-none [box-shadow:none]"
    >
      Update
    </Button>
  )
}

export { UpdateButton }
