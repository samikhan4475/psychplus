import React from 'react'
import { Flex } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { HistorySheetTable } from './sheet-table'

interface SheetViewDataProps {
  data: QuickNoteHistory[]
  setData: (data: QuickNoteHistory[]) => void
}

const SheetView = ({ data, setData }: SheetViewDataProps) => {
  return (
    <Flex mt="2">
      <HistorySheetTable data={data} setData={setData} />
    </Flex>
  )
}

export { SheetView }
