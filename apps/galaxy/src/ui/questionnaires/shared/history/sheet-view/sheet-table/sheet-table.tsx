import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ChevronsUpDown } from 'lucide-react'
import { CheckboxCell, ColumnHeader, DataTable, TextCell } from '@/components'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AddToNoteCell } from './cells'
import { ScoreCell } from './cells/score-cell'

interface SheetViewDataProps {
  data: QuickNoteHistory[]
  setData: (data: QuickNoteHistory[]) => void
}

const createColumns = (
  onCheckAddToNote: (checked: boolean, index?: number) => void,
  allChecked: boolean,
  data: QuickNoteHistory[],
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
      const { totalScore, data, sectionName } = row.original
      return (
        <ScoreCell
          value={totalScore || ''}
          data={data}
          quickNoteSectionName={sectionName as QuickNoteSectionName}
        />
      )
    },
  },
  {
    id: 'addToNote',
    header: () => (
      <CheckboxCell
        label="Add to Note"
        className="px-[9px] font-[500]"
        checked={allChecked}
        disabled={data.length === 0}
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

const HistorySheetTable = ({ data, setData }: SheetViewDataProps) => {
  const handleCheckAddToNote = (checked: boolean, index?: number) => {
    const newList =
      index === undefined
        ? data.map((item) => ({ ...item, addToNote: checked }))
        : data.map((item, i) =>
            i === index ? { ...item, addToNote: checked } : item,
          )
    setData(newList)
  }
  const allChecked = data.every((item) => item.addToNote)

  const columns = createColumns(handleCheckAddToNote, allChecked, data)

  return (
    <ScrollArea>
      <DataTable data={data} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { HistorySheetTable }
