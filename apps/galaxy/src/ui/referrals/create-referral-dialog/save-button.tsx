'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const SaveButton = () => {
  const form = useFormContext()
  return (
    <Button
      highContrast
      size="2"
      loading={form.formState.isSubmitting}
      type="submit"
    >
      Save
    </Button>
  )
}

export { SaveButton }
