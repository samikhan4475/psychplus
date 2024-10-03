import React from 'react'
import { Flex } from '@radix-ui/themes'
import { HistorySheetTable } from './sheet-table'

const SheetView = () => {
  return (
    <Flex mt="2">
      <HistorySheetTable />
    </Flex>
  )
}

export { SheetView }
