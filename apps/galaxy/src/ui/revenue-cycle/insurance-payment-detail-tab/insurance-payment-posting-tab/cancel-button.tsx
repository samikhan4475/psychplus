import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'

interface CancelButtonProps {
  onClick: () => void
}
const CancelButton = ({ onClick }: CancelButtonProps) => {
  const form = useFormContext<SchemaType>()
  return (
    <Button
      size="1"
      variant="outline"
      highContrast
      disabled={form.formState.isSubmitting}
      type="button"
      onClick={onClick}
    >
      Cancel
    </Button>
  )
}

export default CancelButton
