import { useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ChevronsUpDown } from 'lucide-react'
import { CheckboxCell, ColumnHeader, DataTable, TextCell } from '@/components'
import { QuickNoteHistory } from '@/types'
import { AddToNoteCell } from './cells'
import { ScoreCell } from './cells/score-cell'

interface SheetViewDataProps {
  data: QuickNoteHistory[]
}

const createColumns = (
  onCheckAddToNote: (checked: boolean, index?: number) => void,
  allChecked: boolean,
): ColumnDef<QuickNoteHistory>[] => [
  {
    id: 'dateTime',
    header: () => (
      <Flex justify="between" align="center" pr="2">
        <ColumnHeader label="Date/Time" />
        <ChevronsUpDown size="16" stroke="#8B8D98" />
      </Flex>
    ),
    cell: ({ row }) => (
      <TextCell>
        {format(new Date(row.original.createdOn), 'MM/dd/yyyy HH:mm')}
      </TextCell>
    ),
  },
  {
    id: 'note',
    header: () => (
      <Flex justify="between" align="center" pr="2">
        <ColumnHeader label="Note" />
        <ChevronsUpDown size="16" stroke="#8B8D98" />
      </Flex>
    ),
    cell: ({ row }) => <TextCell>{row.original.note}</TextCell>,
  },
  {
    id: 'filledBy',
    header: () => (
      <Flex justify="between" align="center" pr="2">
        <ColumnHeader label="Filled By" />
        <ChevronsUpDown size="16" stroke="#8B8D98" />
      </Flex>
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.createdByRole || row.original.createdByFullName}
      </TextCell>
    ),
  },
  {
    id: 'totalScore',
    header: () => (
      <Flex justify="between" align="center" pr="2">
        <ColumnHeader label="Total Score" />
        <ChevronsUpDown size="16" stroke="#8B8D98" />
      </Flex>
    ),
    cell: ({ row }) => {
      const { totalScore } = row.original

      return <ScoreCell value={totalScore || ''} />
    },
  },
  {
    id: 'addToNote',
    header: () => (
      <CheckboxCell
        label="Add to Note"
        className="px-[9px] font-[500]"
        checked={allChecked}
        onCheckedChange={(checked) => onCheckAddToNote(checked)}
      />
    ),
    cell: ({ row }) => (
      <AddToNoteCell
        checked={row.original.addToNote}
        className="px-[5px]"
        onCheckedChange={(checked) => onCheckAddToNote(checked, row.index)}
      />
    ),
  },
]

const HistorySheetTable = ({ data }: SheetViewDataProps) => {
  const [modifiedData, setModifiedData] = useState(data)

  const handleCheckAddToNote = (checked: boolean, index?: number) => {
    setModifiedData((prevData) =>
      index === undefined
        ? prevData.map((item) => ({ ...item, addToNote: checked }))
        : prevData.map((item, i) =>
            i === index ? { ...item, addToNote: checked } : item,
          ),
    )
  }

  const allChecked = modifiedData.every((item) => item.addToNote)

  const columns = createColumns(handleCheckAddToNote, allChecked)

  return (
    <ScrollArea>
      <DataTable
        data={modifiedData}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { HistorySheetTable }
