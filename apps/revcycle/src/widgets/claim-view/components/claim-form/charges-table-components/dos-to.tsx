import { useState } from 'react'
import { DatePicker } from '@psychplus/ui/date-picker'
import { ClaimServiceLine } from '../types'

interface TableCellProps {
  row: {
    original: ClaimServiceLine
  }
}

const TableCellDosTo = ({
  row: { original: chargeRecord },
}: TableCellProps) => {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <DatePicker
      date={date}
      onSelect={setDate}
      buttonClassName="w-[100%] h-[22px] justify-between text-left font-regular"
      reverse={true}
      color="gray"
      placeholder="mm/dd/yyyy"
    />
  )
}

export { TableCellDosTo }
