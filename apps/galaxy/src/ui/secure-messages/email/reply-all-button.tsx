import React from 'react'
import { Button } from '@radix-ui/themes'
import { ReplyAllIcon } from '@/components/icons'

const ReplyAllButton = () => {
  return (
    <Button
      color="gray"
      className="w-[38px] rounded-3 p-0 text-[14px]"
      variant="outline"
    >
      <ReplyAllIcon />
    </Button>
  )
}

export { ReplyAllButton }
