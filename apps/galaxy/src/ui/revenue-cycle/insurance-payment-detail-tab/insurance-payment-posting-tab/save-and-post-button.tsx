import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'

const SaveAndPostButton = () => {
  const form = useFormContext<SchemaType>()

  return (
    <Button
      size="1"
      type="submit"
      loading={form.formState.isSubmitting}
      name="Save_Post"
      highContrast
    >
      Save & Post
    </Button>
  )
}

export { SaveAndPostButton }
