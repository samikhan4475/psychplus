import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PaymentListTypes } from '../types'
import { SchemaType } from './schema'

const SaveButton = () => {
  const form = useFormContext<SchemaType>()
  const paymentStatus = form.watch('status')
  return (
    <Button
      size="1"
      variant="outline"
      loading={form.formState.isSubmitting}
      disabled={paymentStatus === PaymentListTypes.Posted}
      highContrast
      name="Save"
      type="submit"
    >
      Save
    </Button>
  )
}

export { SaveButton }
