import React from 'react'
import { Flex } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { HistorySheetTable } from './sheet-table'

interface SheetViewDataProps {
  data: QuickNoteHistory[]
}

const SheetView = ({ data }: SheetViewDataProps) => {
  return (
    <Flex mt="2">
      <HistorySheetTable data={data} />
    </Flex>
  )
}

export { SheetView }
