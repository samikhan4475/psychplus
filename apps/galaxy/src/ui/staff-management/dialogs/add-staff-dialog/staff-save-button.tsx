import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'

const StaffSaveButton = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Button
      type="submit"
      loading={form.formState.isSubmitting}
      size="2"
      className="ml-auto mt-2 w-fit"
      highContrast
    >
      Save
    </Button>
  )
}

export { StaffSaveButton }
