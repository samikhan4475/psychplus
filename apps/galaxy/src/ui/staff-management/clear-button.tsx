import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './staff-filter-form'

const ClearButton = () => {
  const form = useFormContext<SchemaType>()
  const onClear = () => {
    form.reset()
  }
  return (
    <Button
      size="1"
      color="gray"
      className="text-black"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export default ClearButton
