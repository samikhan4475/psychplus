'use client'

import { getPOSCodesOptions } from '@/actions/get-poscodes'
import { AsyncSelect } from '@/components'

interface TableCellPOSProps {
  rowIndex: number
}

const TableCellPOS: React.FC<TableCellPOSProps> = ({ rowIndex }) => {
  return (
    <AsyncSelect
      field={`claimServiceLines.${rowIndex}.placeOfService`}
      placeholder="Select"
      fetchOptions={getPOSCodesOptions}
      buttonClassName="w-full h-6 box-shadow-none"
      className="h-full flex-1"
    />
  )
}

export { TableCellPOS }
