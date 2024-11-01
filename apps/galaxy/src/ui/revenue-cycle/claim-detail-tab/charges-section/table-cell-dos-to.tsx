'use client'

import { DatePickerInput } from '@/components'

interface TableCellDosToProps {
  rowIndex: number
}

const TableCellDosTo: React.FC<TableCellDosToProps> = ({ rowIndex }) => {
  return (
    <DatePickerInput
      field={`claimServiceLines.${rowIndex}.dateOfServiceTo`}
      dateInputClass={'!border-none'}
    />
  )
}

export { TableCellDosTo }
