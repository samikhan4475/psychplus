import React, { BaseSyntheticEvent } from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { SchemaType } from '../schema'

const CancelRectifyButton = ({
  row,
}: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const serviceLines = form.watch('claimServiceLinePayments')
  const onCancel = (event?: BaseSyntheticEvent) => {
    event?.preventDefault()
    // need to remove the normal / rectified and also make the first row normal again
    const clonedServiceLines = structuredClone(serviceLines)
    const firstRowIndex = row.index - 2
    clonedServiceLines.splice(row.index - 1, 2)
    clonedServiceLines[firstRowIndex].id =
      clonedServiceLines[firstRowIndex].claimServiceLineId
    delete clonedServiceLines[firstRowIndex].rectificationId
    form.setValue('claimServiceLinePayments', clonedServiceLines)
  }
  return (
    <Button
      onClick={onCancel}
      size="1"
      radius="medium"
      highContrast
      variant="solid"
    >
      Cancel
    </Button>
  )
}

export { CancelRectifyButton }
