'use client'

import { Button, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const SaveChargesButton = () => {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext()

  const hasErrors = Object.keys(errors)?.length > 0
  return (
    <Flex justify="end" mt="3">
      <Button disabled={hasErrors || isSubmitting} size="2" highContrast>
        Save Changes
      </Button>
    </Flex>
  )
}

export { SaveChargesButton }
