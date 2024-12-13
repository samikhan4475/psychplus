import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'

const SaveButton = () => {
  const form = useFormContext<SchemaType>()

  const { isSubmitting } = form.formState

  return (
    <Button
      size="2"
      loading={isSubmitting}
      highContrast
      name="Save"
      type="submit"
    >
      Save
    </Button>
  )
}

export { SaveButton }
