'use client'

import { Box, Flex } from '@radix-ui/themes'
import { ColumnDef, type Table } from '@tanstack/react-table'
import { type Location } from '@psychplus/management-locations/types'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DataTableColumnHeader } from '@psychplus/ui/data-table/data-table-column-header'
import { DataTablePageNavigation } from '@psychplus/ui/data-table/data-table-page-navigation'
import { DataTablePaginationLabel } from '@psychplus/ui/data-table/data-table-pagination-label'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useStore } from '../store'
import { FilterForm } from './filter-form'
import { RowActionDropdown } from './row-action-dropdown'
import { TableCellStatus } from './table-cell-status'

const columns: ColumnDef<Location>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.id} />,
  },
  {
    id: 'location-type',
    accessorKey: 'locationType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Location Type"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.locationType} />,
  },
  {
    id: 'location name',
    accessorKey: 'locationName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Location Name"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.locationName} />,
  },
  {
    id: 'npi',
    accessorKey: 'npi',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="NPI"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.npi} />,
  },
  {
    id: 'taxonomy',
    accessorKey: 'taxonomy',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Taxonomy"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.taxonomy} />,
  },
  {
    id: 'p-address-1',
    accessorKey: 'p_address_1',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="P Address 1"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.p_address_1} />,
  },
  {
    id: 'p_address_2',
    accessorKey: 'p_address_2',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="P Address 2"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.p_address_2} />,
  },
  {
    id: 'city',
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="City"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.city} />,
  },
  {
    id: 'state',
    accessorKey: 'state',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="State"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.state} />,
  },
  {
    id: 'zip',
    accessorKey: 'zip',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Zip"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.zip} />,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.phone} />,
  },
  {
    id: 'fax',
    accessorKey: 'fax',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Fax"
        className="font-medium text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.fax} />,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="font-medium text-[#1C2024] "
      />
    ),
    cell: () => <TableCellStatus />,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="font-medium text-[#1C2024]"
      />
    ),
    enableHiding: false,
    cell: ({ row }) => (
      <Flex justify="center">
        <RowActionDropdown data={row.original} />
      </Flex>
    ),
  },
]

const DataTableFooter = (table: Table<Location>) => (
  <Flex p="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const LocationListTable = () => {
  const { locations } = useStore((state) => ({
    locations: state.locations,
  }))

  return (
    <Flex gap={'2'} direction={'column'} width={'100%'}>
      <FilterForm />
      <Box p={'3'}>
        <DataTable
          tableClass="bg-[white] rounded-2 overflow-hidden"
          tHeadClass="bg-[#D9E2FC]"
          thClass="pl-1 p-2 border border-[#CAD8FD] text-center text-3 "
          columnCellClass="pl-1 border border-[#CAD8FD] [box-shadow:none] text-3 font-medium"
          renderFooter={DataTableFooter}
          initialPageSize={10}
          data={locations}
          columns={columns}
          isRowPan={true}
        />
      </Box>
    </Flex>
  )
}

export { LocationListTable }
