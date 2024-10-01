import React from 'react'
import { Button } from '@radix-ui/themes'
import { ReplyAllIcon } from '@/components/icons'

const ReplyAllButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      color="gray"
      type="button"
      onClick={onClick}
      className="w-[38px] rounded-3 p-0 text-[14px]"
      variant="outline"
    >
      <ReplyAllIcon />
    </Button>
  )
}

export { ReplyAllButton }
