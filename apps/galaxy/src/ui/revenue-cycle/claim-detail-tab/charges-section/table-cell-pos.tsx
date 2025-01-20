'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { FormFieldError, SelectInput } from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

interface TableCellPOSProps {
  rowIndex: number
}

const TableCellPOS: React.FC<TableCellPOSProps> = ({ rowIndex }) => {
  const { posCodesData } = useRevCycleDataProvider()
  return (
    <Flex direction={'column'}>
      <SelectInput
        field={`claimServiceLines.${rowIndex}.placeOfService`}
        placeholder="Select"
        options={posCodesData}
        buttonClassName="w-[100px] h-6 box-shadow-none"
        className="h-full flex-1"
      />
      <FormFieldError name={`claimServiceLines.${rowIndex}.placeOfService`} />
    </Flex>
  )
}

export { TableCellPOS }
