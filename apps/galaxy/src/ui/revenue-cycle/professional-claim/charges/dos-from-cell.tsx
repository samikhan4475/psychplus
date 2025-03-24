'use client'

import { DatePickerInput } from '@/components'

interface DOSFromCellProps {
  rowIndex: number
}

const DOSFromCell: React.FC<DOSFromCellProps> = ({ rowIndex }) => {
  return (
    <DatePickerInput
      field={`claimServiceLines.${rowIndex}.dateOfServiceFrom`}
      dateInputClass={'!border-none'}
      yearFormat="YYYY"
    />
  )
}

export { DOSFromCell }
