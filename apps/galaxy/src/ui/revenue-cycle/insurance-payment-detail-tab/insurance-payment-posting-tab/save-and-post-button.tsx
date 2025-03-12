import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PaymentListTypes } from '../types'
import { SchemaType } from './schema'
import { rectifiedRowExists } from './utils'

const SaveAndPostButton = () => {
  const form = useFormContext<SchemaType>()
  const paymentStatus = form.watch(`status`)
  const serviceLinePayments = form.watch('claimServiceLinePayments')
  const rectifiedRow = rectifiedRowExists(serviceLinePayments)
  return (
    <Button
      size="1"
      type="submit"
      disabled={paymentStatus === PaymentListTypes.Posted && !rectifiedRow}
      loading={form.formState.isSubmitting}
      name="Save_Post"
      highContrast
    >
      Save & Post
    </Button>
  )
}

export { SaveAndPostButton }
