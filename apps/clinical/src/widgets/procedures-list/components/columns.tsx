import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import { TableCellText } from 'node_modules/@psychplus/ui/src/table-cell'
import { Procedure } from '@psychplus/procedures'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { RowActionDropdown } from './row-action-dropdown'
import { TableCellLongText } from './table-cell-long-text'

const columns = () => {
  const DATE_FORMAT = 'MM/dd/yyyy'

  const columns: ColumnDef<Procedure>[] = [
    {
      id: 'procedureDate',
      accessorKey: 'procedureDate',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Date"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={
            row.original?.procedureDate
              ? format(new Date(row.original?.procedureDate), DATE_FORMAT)
              : ''
          }
        />
      ),
      enableHiding: true,
    },
    {
      id: 'targetSiteCode',
      accessorKey: 'targetSiteCode',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Code"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText
          maxWidth={100}
          text={row.original?.procedureCode}
          row={row.original}
        />
      ),
      enableHiding: true,
    },
    {
      id: 'targetSiteDescription',
      accessorKey: 'targetSiteDescription',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Description"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText
          maxWidth={100}
          text={row.original?.procedureCodeDescription}
          row={row.original}
        />
      ),
      enableHiding: true,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      enableHiding: false,
      cell: ({ row }) => (
        <Flex justify="center">
          <RowActionDropdown data={row.original} />
        </Flex>
      ),
    },
  ]
  return columns
}
export { columns }
