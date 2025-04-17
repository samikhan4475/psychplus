'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { ProfileSchemaType } from './profile-form'

const SaveButton = () => {
  const form = useFormContext<ProfileSchemaType>()

  return (
    <Button
      size="1"
      highContrast
      type="submit"
      loading={form.formState.isSubmitting}
    >
      <SaveIcon width={15} height={15} strokeWidth={1.75} />
      Save
    </Button>
  )
}

export { SaveButton }
