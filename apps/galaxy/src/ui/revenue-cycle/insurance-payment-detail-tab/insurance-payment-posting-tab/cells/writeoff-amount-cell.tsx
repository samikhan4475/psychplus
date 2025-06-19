import React from 'react'
import { Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { SchemaType } from '../schema'

const WriteoffAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const writeOffAmount = form.watch(
    `claimServiceLinePayments.${row.index}.writeOffAmount`,
  )

  const writeOffFixed = parseFloat(writeOffAmount || '0').toFixed(2)

  return (
    <TextField.Root
      value={writeOffFixed}
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

export { WriteoffAmountCell }
