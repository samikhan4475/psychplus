import React from 'react'
import { Button } from '@radix-ui/themes'
import { ReplyIcon } from '@/components/icons'

const ReplyButton = ({
  disabled,
  onClick,
}: {
  disabled: boolean
  onClick?: () => void
}) => {
  return (
    <Button
      color="gray"
      onClick={onClick}
      className="text-black w-[80px] rounded-3 p-0 text-[14px]"
      variant="outline"
      disabled={disabled}
    >
      <ReplyIcon />
      Reply
    </Button>
  )
}

export { ReplyButton }
