'use client'

import { IconButton } from '@radix-ui/themes'
import { CheckIcon } from 'lucide-react'

const SaveButton = ({
  onSave,
  disabled,
}: {
  onSave: () => void
  disabled: boolean
}) => {
  return (
    <IconButton
      size="1"
      color="green"
      variant="ghost"
      type="submit"
      onClick={onSave}
      disabled={disabled}
    >
      <CheckIcon width={16} height={16} className="cursor-pointer" />
    </IconButton>
  )
}

export { SaveButton }
