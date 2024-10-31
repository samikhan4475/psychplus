import React, { useState } from 'react'
import { TextField } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { DollarIcon } from '@/components/icons'
import { ClaimServiceLinePayment } from '../../../types'

const BalanceAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const [balanceAmount] = useState('00.00')
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
        <DollarIcon />
      </TextField.Slot>
    </TextField.Root>
  )
}

export { BalanceAmountCell }
