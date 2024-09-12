'use client'

import { Column, Row, type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { HealthProblem } from '@psychplus/health-concerns/types'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellLongText, TableCellText } from '@psychplus/ui/table-cell'
import { Button } from '@radix-ui/themes'

const DATE_FORMAT = 'yyyy-MM-dd'

const AddConcernsTable = ({
  data,
  handelRemoveRow,
}: {
  data: HealthProblem[]
  handelRemoveRow: (row: Row<HealthProblem>) => void
}) => {
  return (
    <DataTable
      data={data}
      columns={columns(handelRemoveRow, data)}
      tableClass="bg-[white]"
      tHeadClass="bg-[#EBF3FC] h-7"
      thClass="border border-solid border-[#CAD8FD] text-center"
      isRowPan={true}
      columnCellClass="border-x border-[#CAD8FD] w-50"
    />
  )
}

const DataTableHeader = ({
  title,
  column,
}: {
  title: string
  column: Column<any>
}) => (
  <DataTableColumnHeader
    column={column}
    title={title}
    className="text-3 font-regular text-[#000]"
  />
)

const columns = (
  handleRemoveRow: (row: Row<HealthProblem>) => void,
  data: HealthProblem[],
): ColumnDef<HealthProblem>[] => [
  {
    id: 'date',
    accessorKey: 'date',
    header: ({ column }) => <DataTableHeader title="Date" column={column} />,
    cell: ({ row }) => (
      <TableCellText
        text={
          row?.original?.metadata?.createdOn
            ? format(new Date(row?.original?.metadata?.createdOn), DATE_FORMAT)
            : ''
        }
      />
    ),
  },

  {
    id: 'codeOrDescription',
    accessorKey: 'codeOrDescription',
    header: ({ column }) => (
      <DataTableHeader title="Description" column={column} />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={`${row.original.symptomCode} ${row.original.symptomCodeDescription}`}
      />
    ),
  },

  {
    id: 'actions',
    header: ({ column }) => <DataTableHeader title="Actions" column={column} />,
    cell: ({ row }) => <Button onClick={() => handleRemoveRow(row)}>X</Button>,
  },
]

export { AddConcernsTable }
