'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'

const CancelButton = ({
  onCancel,
  disabled,
}: {
  onCancel: () => void
  disabled: boolean
}) => {
  return (
    <IconButton
      size="1"
      color="red"
      variant="ghost"
      onClick={onCancel}
      disabled={disabled}
    >
      <Cross1Icon width={16} height={16} className="cursor-pointer" />
    </IconButton>
  )
}

export { CancelButton }
