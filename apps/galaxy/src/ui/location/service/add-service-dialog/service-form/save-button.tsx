'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../../store'
import { ServiceSchemaType } from './schema'

const SaveButton = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<ServiceSchemaType>()
  const loading = useStore(
    (state) => state.cosignersLoading ?? state.visitTypesLoading,
  )

  return (
    <Button
      size="2"
      mt="2"
      ml="auto"
      highContrast
      disabled={loading}
      loading={isSubmitting}
    >
      Save
    </Button>
  )
}

export { SaveButton }
