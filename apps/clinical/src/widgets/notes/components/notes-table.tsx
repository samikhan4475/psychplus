import { Box, Flex } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DataTableColumnHeader } from '@psychplus/ui/data-table/data-table-column-header'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useRowSelectionContext } from '../context'
import { TableHeaderCheckbox } from './table-header-checkbox'
import { TableRowCheckbox } from './table-row-checkbox'

interface Note {
  date: string
  time: string
  authors: string
  visitType: string
  visitTitle: string
  location: string
  service: string
  state: string
  practice: string
  organization: string
  status: string
}

const headerClassName = 'text-[#000000] text-[12px] font-[510] my-[-2px]'

const data = [
  {
    date: '22/06/24',
    time: '13:38',
    authors: 'John Smith, MD',
    visitType: 'Est Pt, Outpatient, In-person',
    visitTitle: 'Psychiatric Evaluation',
    location: 'Test Clinic',
    service: 'Therapy',
    state: 'US',
    practice: 'Psychiatry',
    organization: 'Test Org',
    status: 'Signed',
  },
  {
    date: '22/06/24',
    time: '13:38',
    authors: 'John Smith, MD',
    visitType: 'Est Pt, Outpatient, In-person',
    visitTitle: 'Psychiatric Evaluation',
    location: 'Test Clinic',
    service: 'Therapy',
    state: 'US',
    practice: 'Psychiatry',
    organization: 'Test Org',
    status: 'Signed',
  },
  {
    date: '22/06/24',
    time: '13:38',
    authors: 'John Smith, MD',
    visitType: 'Est Pt, Outpatient, In-person',
    visitTitle: 'Psychiatric Evaluation',
    location: 'Test Clinic',
    service: 'Therapy',
    state: 'US',
    practice: 'Psychiatry',
    organization: 'Test Org',
    status: 'Signed',
  },
  {
    date: '22/06/24',
    time: '13:38',
    authors: 'John Smith, MD',
    visitType: 'Est Pt, Outpatient, In-person',
    visitTitle: 'Psychiatric Evaluation',
    location: 'Test Clinic',
    service: 'Therapy',
    state: 'US',
    practice: 'Psychiatry',
    organization: 'Test Org',
    status: 'Signed',
  },
  {
    date: '22/06/24',
    time: '13:38',
    authors: 'John Smith, MD',
    visitType: 'Est Pt, Outpatient, In-person',
    visitTitle: 'Psychiatric Evaluation',
    location: 'Test Clinic',
    service: 'Therapy',
    state: 'US',
    practice: 'Psychiatry',
    organization: 'Test Org',
    status: 'Signed',
  },
]

const columns: ColumnDef<Note>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <TableHeaderCheckbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={table.toggleAllPageRowsSelected}
      />
    ),
    cell: ({ row }) => (
      <TableRowCheckbox
        checked={row.getIsSelected()}
        onCheckedChange={row.toggleSelected}
      />
    ),
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={headerClassName}
        column={column}
        title="Date"
      />
    ),
    cell: ({ row }) => (
      <Flex className="gap-x-2">
        <TableCellText text={row.original.date} className="text-[12px]" />
        <TableCellText text={row.original.time} className="text-[12px]" />
      </Flex>
    ),
  },
  {
    id: 'authors',
    accessorKey: 'time',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={headerClassName}
        column={column}
        title="Author(s)"
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.authors} />
    ),
  },
  {
    id: 'visit-type',
    accessorKey: 'visitType',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={headerClassName}
        column={column}
        title="Visit Type"
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.visitType} />
    ),
  },
  {
    id: 'visit-title',
    accessorKey: 'visitTitle',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={headerClassName}
        column={column}
        title="Visit Title"
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.visitTitle} />
    ),
  },
  {
    id: 'location',
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={headerClassName}
        column={column}
        title="Location"
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.location} />
    ),
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={headerClassName}
        column={column}
        title="Service"
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.service} />
    ),
  },
  {
    id: 'state',
    accessorKey: 'state',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={headerClassName}
        column={column}
        title="State"
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.state} />
    ),
  },
  {
    id: 'practice',
    accessorKey: 'practice',
    header: ({ column }) => (
      <DataTableColumnHeader
        className={headerClassName}
        column={column}
        title="Practice"
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.practice} />
    ),
  },
  {
    id: 'organization',
    accessorKey: 'organization',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Organization"
        className={headerClassName}
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.organization} />
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className={headerClassName}
      />
    ),
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.status} />
    ),
  },
]

const NotesTable = () => {
  const { setSelectedRow } = useRowSelectionContext()

  const onRowSelect = (row: Row<Note>, table: Table<Note>) => {
    table.setRowSelection({ [row.id]: true })
    setSelectedRow(row.id)
  }

  return (
    <Box className="mt-2 min-w-fit p-2">
      <DataTable
        columns={columns}
        data={data}
        tHeadClass="bg-[#F0F4FF]"
        thClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72] pl-1"
        tableClass="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        columnCellClass="[box-shadow:inset_0_0_0_0.1px_#0134DB72] pl-1"
        onRowSelect={onRowSelect}
      />
    </Box>
  )
}

export { NotesTable }
