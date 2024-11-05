'use client'

import { Box, Flex } from '@radix-ui/themes'
import { getPOSCodesOptions } from '@/actions/get-poscodes'
import { AsyncSelect, FormFieldError } from '@/components'

interface TableCellPOSProps {
  rowIndex: number
}

const TableCellPOS: React.FC<TableCellPOSProps> = ({ rowIndex }) => {
  return (
    <Flex direction={'column'}>
      <AsyncSelect
        field={`claimServiceLines.${rowIndex}.placeOfService`}
        placeholder="Select"
        fetchOptions={getPOSCodesOptions}
        buttonClassName="w-full h-6 box-shadow-none"
        className="h-full flex-1"
      />
      <FormFieldError name={`claimServiceLines.${rowIndex}.placeOfService`} />
    </Flex>
  )
}

export { TableCellPOS }
