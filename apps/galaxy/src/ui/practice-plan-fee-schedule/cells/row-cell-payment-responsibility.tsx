'use client'

import { TextField } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { FeeSchedule } from '../types'

const RowCellPaymentResponsibility = ({
  row: { original: record },
}: PropsWithRow<FeeSchedule>) => {
  return (
    <TextField.Root
      size="1"
      className="border-pp-gray-2 h-4 w-[130px] border border-solid !outline-none [box-shadow:none]"
      value={record.paymentResponsibility}
    />
  )
}

export { RowCellPaymentResponsibility }
