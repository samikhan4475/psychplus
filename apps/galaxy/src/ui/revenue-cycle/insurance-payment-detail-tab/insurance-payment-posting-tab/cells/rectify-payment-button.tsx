import React, { BaseSyntheticEvent } from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { SchemaType } from '../schema'
import { getNegativeRow } from './utils'

const RectifyPaymentButton = ({
  row,
}: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()

  const serviceLinePayments = form.getValues('claimServiceLinePayments')

  const onRectify = (event?: BaseSyntheticEvent) => {
    event?.preventDefault()
    const { billedAmount, id } = row.original
    // need to add rectified and normal row
    const clonedServiceLine = structuredClone(row.original)
    delete clonedServiceLine.id

    const normalRow = {
      ...clonedServiceLine,
      billedAmount: billedAmount,
      isRectifiedRow: true,
      allowedAmount: '',
      paidAmount: '',
      copayAmount: '',
      coinsuranceAmount: '',
      deductibleAmount: '',
      writeOffAmount: '',
      otherPr: '',
      serviceLinePaymentAdjustments: [],
    }
    serviceLinePayments[row.index].rectificationId = row.original.id
    clonedServiceLine.rectificationId = id
    serviceLinePayments.splice(
      row.index + 1,
      0,
      getNegativeRow(clonedServiceLine),
      normalRow,
    )
    form.setValue('claimServiceLinePayments', serviceLinePayments)
  }
  return (
    <Button
      onClick={onRectify}
      size="1"
      radius="medium"
      highContrast
      variant="solid"
    >
      Rectify
    </Button>
  )
}

export { RectifyPaymentButton }
