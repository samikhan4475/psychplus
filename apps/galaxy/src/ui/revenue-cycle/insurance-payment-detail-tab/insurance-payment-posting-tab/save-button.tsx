import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'

const SaveButton = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Button
      size="1"
      variant="outline"
      loading={form.formState.isSubmitting}
      highContrast
      name="Save"
      type="submit"
    >
      Save
    </Button>
  )
}

export { SaveButton }
