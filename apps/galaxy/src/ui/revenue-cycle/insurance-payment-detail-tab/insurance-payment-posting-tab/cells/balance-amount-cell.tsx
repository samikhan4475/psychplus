import React from 'react'
import { Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { SchemaType } from '../schema'
import { calculateBalanceAmount } from './utils'

const BalanceAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()

  const serviceLine = form.watch(`claimServiceLinePayments.${row.index}`)
  const balanceAmount = calculateBalanceAmount(serviceLine)

  return (
    <TextField.Root
      value={balanceAmount}
      variant="soft"
      disabled
      placeholder="00.00"
      className="h-4 !rounded-[0px] !border-transparent bg-transparent !outline-none"
      size="1"
    >
      <TextField.Slot>
        <Text className="text-[12px]">$</Text>
      </TextField.Slot>
    </TextField.Root>
  )
}

export { BalanceAmountCell }
