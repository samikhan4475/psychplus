'use client'

import { DatePickerInput } from '@/components'

interface DOSToCellProps {
  rowIndex: number
}

const DOSToCell: React.FC<DOSToCellProps> = ({ rowIndex }) => {
  return (
    <DatePickerInput
      field={`claimServiceLines.${rowIndex}.dateOfServiceTo`}
      dateInputClass={'!border-none'}
      yearFormat="YYYY"
    />
  )
}

export { DOSToCell }
