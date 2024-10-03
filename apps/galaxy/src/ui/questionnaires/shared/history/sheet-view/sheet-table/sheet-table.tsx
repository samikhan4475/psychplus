import { useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { ChevronsUpDown } from 'lucide-react'
import { CheckboxCell, ColumnHeader, DataTable, TextCell } from '@/components'
import { AddToNoteCell } from './cells'
import { ScoreCell } from './cells/score-cell'

interface HistorySheetData {
  'Date/Time': string
  Note: string
  FilledBy: string
  TotalScore: string
  AddToNote: boolean
}

const createColumns = (
  handleCheckNote: (id: number, checked: boolean) => void,
  checkedNotes: Record<number, boolean>,
): ColumnDef<HistorySheetData>[] => [
  {
    id: 'dateTime',
    header: () => (
      <Flex justify="between" align="center" pr="2">
        <ColumnHeader label="Date/Time" />
        <ChevronsUpDown size="16" stroke="#8B8D98" />
      </Flex>
    ),
    cell: ({ row }) => <TextCell> {row.original['Date/Time']}</TextCell>,
  },
  {
    id: 'note',
    header: () => (
      <Flex justify="between" align="center" pr="2">
        <ColumnHeader label="Note" />
        <ChevronsUpDown size="16" stroke="#8B8D98" />
      </Flex>
    ),
    cell: ({ row }) => <TextCell>{row.original.Note}</TextCell>,
  },
  {
    id: 'filledBy',
    header: () => (
      <Flex justify="between" align="center" pr="2">
        <ColumnHeader label="Filled/By" />
        <ChevronsUpDown size="16" stroke="#8B8D98" />
      </Flex>
    ),
    cell: ({ row }) => <TextCell>{row.original.FilledBy} </TextCell>,
  },
  {
    id: 'totalScore',
    header: () => (
      <Flex justify="between" align="center" pr="2">
        <ColumnHeader label="Total Score" />
        <ChevronsUpDown size="16" stroke="#8B8D98" />
      </Flex>
    ),
    cell: ({ row }) => <ScoreCell value={row.original.TotalScore} />,
  },
  {
    id: 'addToNote',
    header: () => (
      <CheckboxCell
        label="Add to Note"
        className="px-[9px] font-[500]"
        checked={Object.values(checkedNotes).every((checked) => checked)}
        onCheckedChange={(checked) => handleCheckNote(-1, checked)}
      />
    ),
    cell: ({ row: { index } }) => (
      <AddToNoteCell
        checked={checkedNotes[index]}
        className="px-[5px]"
        onCheckedChange={(checked) => handleCheckNote(index, checked)}
      />
    ),
  },
]

const HistorySheetTable = () => {
  const [checkedNotes, setCheckedNotes] = useState<Record<number, boolean>>(
    Array(25)
      .fill(0)
      .reduce((acc, _, index) => ({ ...acc, [index]: false }), {}),
  )

  const handleCheckNote = (id: number, checked: boolean) => {
    if (id === -1) {
      const updated = Object.keys(checkedNotes).reduce(
        (acc, key) => ({ ...acc, [key]: checked }),
        {},
      )
      setCheckedNotes(updated)
    } else {
      setCheckedNotes((prev) => ({ ...prev, [id]: checked }))
    }
  }

  const columns = createColumns(handleCheckNote, checkedNotes)

  const data: HistorySheetData[] = Array(25).fill({
    'Date/Time': '2024-09-30 10:00 AM',
    Note: 'Out Pt, New Pt, In-Person',
    FilledBy: 'Provider',
    TotalScore: '25',
    AddToNote: false,
  })

  return (
    <ScrollArea>
      <DataTable data={data} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { HistorySheetTable }
