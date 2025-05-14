import React from 'react'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

const SavePreferredPartnerProfileButton = () => {
  const form = useFormContext()
  return (
    <Button
      loading={form.formState.isSubmitting}
      className="ml-auto"
      type="submit"
      size="1"
      highContrast
    >
      <SaveIcon width="16" className="mr-1" /> Save
    </Button>
  )
}

export { SavePreferredPartnerProfileButton }
