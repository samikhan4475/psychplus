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
  setData: (data: QuickNoteHistory[]) => void
}

enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

const SortableHeader = ({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) => (
  <Flex
    justify="between"
    align="center"
    pr="2"
    onClick={onClick}
    className={`${onClick ? 'cursor-pointer' : ''}`}
  >
    <ColumnHeader label={label} />
    {onClick && <ChevronsUpDown size="16" stroke="#8B8D98" />}
  </Flex>
)

const createColumns = (
  onCheckAddToNote: (checked: boolean, index?: number) => void,
  allChecked: boolean,
  data: QuickNoteHistory[],
  handleSortData: (value: string) => void,
): ColumnDef<QuickNoteHistory>[] => [
  {
    id: 'dateTime',
    header: () => (
      <SortableHeader
        label="Date/Time"
        onClick={() => handleSortData('createdOn')}
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {format(new Date(row.original.createdOn), 'MM/dd/yyyy HH:mm')}
      </TextCell>
    ),
  },
  {
    id: 'filledBy',
    header: () => <SortableHeader label="Filled By" />,
    cell: ({ row }) => (
      <TextCell>{`${row.original.createdByFullName} (${row.original.createdByRole})`}</TextCell>
    ),
  },
  {
    id: 'visitType',
    header: () => <SortableHeader label="Visit Type" />,
    cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
  },
  {
    id: 'visitId',
    header: () => <SortableHeader label="Visit ID" />,
    cell: ({ row }) => <TextCell>{row.original.visitId}</TextCell>,
  },
  {
    id: 'totalScore',
    header: () => (
      <SortableHeader
        label="Total Score"
        onClick={() => handleSortData('totalScore')}
      />
    ),
    cell: ({ row }) => {
      const { totalScore } = row.original
      return (
        <ScoreCell value={totalScore || ''} data={data} row={row.original} />
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
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc)

  const handleSortData = (value: string) => {
    const sortedData = [...data]
    const newSortOrder =
      sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc
    setSortOrder(newSortOrder)

    sortedData.sort((a, b) => {
      switch (value) {
        case 'createdOn': {
          const dateA = new Date(a.createdOn).getTime()
          const dateB = new Date(b.createdOn).getTime()
          return newSortOrder === SortOrder.Asc ? dateA - dateB : dateB - dateA
        }
        case 'totalScore': {
          const scoreA = Number(a.totalScore)
          const scoreB = Number(b.totalScore)
          return newSortOrder === SortOrder.Asc
            ? scoreA - scoreB
            : scoreB - scoreA
        }

        default:
          return 0
      }
    })

    setData(sortedData)
  }

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

  const columns = createColumns(
    handleCheckAddToNote,
    allChecked,
    data,
    handleSortData,
  )

  return (
    <ScrollArea>
      <DataTable data={data} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { HistorySheetTable }
