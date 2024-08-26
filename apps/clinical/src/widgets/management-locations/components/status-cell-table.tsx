import { Box, Heading } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DataTableColumnHeader } from '@psychplus/ui/data-table/data-table-column-header'
import { TableCellText } from '@psychplus/ui/table-cell'
import { StatusTableData } from '../types'

const data = [
  {
    user: 'Facility',
    date: '20/03/2003',
    status: 'Inactive',
  },
]
const columns: ColumnDef<StatusTableData>[] = [
  {
    id: 'user',
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="User"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.user} />,
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date/Time"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.date} />,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.status} />,
  },
]
const StatusCellTable = () => {
  return (
    <Box>
      <Heading size={'4'} mb={'2'}>
        Status Hx
      </Heading>
      <DataTable
        tHeadClass="bg-[#F0F4FF] rounded-2xl"
        thClass="pl-1 border border-[#D9E2FC] text-center"
        tableClass="w-[100%] px-1 border-collapse border-[#D9E2FC] border-radius-[10px]"
        columnCellClass="pl-1 border border-[#D9E2FC] [box-shadow:none] text-[#1C2024]"
        headerCellClass="rounded-2xl"
        data={data}
        columns={columns}
      />
    </Box>
  )
}
export { StatusCellTable }
