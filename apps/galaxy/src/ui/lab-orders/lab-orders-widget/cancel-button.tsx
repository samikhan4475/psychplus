import React from 'react'
import { Button } from '@radix-ui/themes'

interface CancelButtonProps {
  onCancel: () => void
}

const CancelButton = ({ onCancel }: CancelButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onCancel}
      variant="outline"
      color="gray"
      size="2"
    >
      Cancel
    </Button>
  )
}

export { CancelButton }
