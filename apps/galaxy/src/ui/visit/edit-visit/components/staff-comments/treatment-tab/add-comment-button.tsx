'use client'

import { Button } from '@radix-ui/themes'

const AddCommentButton = () => {
  return (
    <Button
      color="gray"
      size="1"
      className="bg-pp-black-1 text-white ml-auto cursor-pointer px-3 py-1.5"
      type="submit"
    >
      Add
    </Button>
  )
}

export { AddCommentButton }
