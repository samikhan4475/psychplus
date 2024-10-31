import React from 'react'
import { Button } from '@radix-ui/themes'

interface CancelButtonProps {
  onClick: () => void
}
const CancelButton = ({ onClick }: CancelButtonProps) => (
  <Button
    size="1"
    variant="outline"
    highContrast
    type="button"
    onClick={onClick}
  >
    Cancel
  </Button>
)

export default CancelButton
