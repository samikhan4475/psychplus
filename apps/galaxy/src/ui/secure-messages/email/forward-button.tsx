import React from 'react'
import { Button } from '@radix-ui/themes'
import { ForwardIcon } from '@/components/icons'

const ForwardButton = ({
  disabled,
  onClick,
}: {
  disabled: boolean
  onClick?: () => void
}) => {
  return (
    <Button
      onClick={onClick}
      color="gray"
      className="text-black w-[97px] gap-1 rounded-3 p-0 text-[14px]"
      variant="outline"
      disabled={disabled}
      loading={disabled}
    >
      <ForwardIcon />
      Forward
    </Button>
  )
}

export { ForwardButton }
