import React from 'react'
import { Button } from '@radix-ui/themes'

const DiscardButton = ({
  loading,
  disabled,
  onClick,
}: {
  loading: boolean
  disabled: boolean
  onClick: () => void
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      color="gray"
      className="disabled:text-pp-text-primary-base w-[105px] rounded-[6px] p-0"
      variant="outline"
      loading={loading}
      disabled={disabled}
    >
      Discard
    </Button>
  )
}

export { DiscardButton }
