'use client'

import { DatePickerInput } from '@/components'

interface TableCellDosFromProps {
  rowIndex: number
}

const TableCellDosFrom: React.FC<TableCellDosFromProps> = ({ rowIndex }) => {
  return (
    <DatePickerInput
      field={`claimServiceLines.${rowIndex}.dateOfServiceFrom`}
      dateInputClass={'!border-none'}
    />
  )
}

export { TableCellDosFrom }
