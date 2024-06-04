import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import {
  TableCellLongText,
  TableCellText,
} from 'node_modules/@psychplus/ui/src/table-cell'
import { FunctionalCognitive } from '@psychplus/functional-cognitive'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { RowActionDropdown } from './row-action-dropdown'

const columns = () => {
  const DATE_TIME_FORMAT = 'MM/dd/yyyy'
  const columns: ColumnDef<FunctionalCognitive>[] = [
    {
      id: 'effectiveDate',
      accessorKey: 'effectiveDate',
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
            row.original?.effectiveDate
              ? format(new Date(row.original?.effectiveDate), DATE_TIME_FORMAT)
              : ''
          }
        />
      ),
      enableHiding: true,
    },
    {
      id: 'symptomCode',
      accessorKey: 'symptomCode',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Code"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row.original?.symptomCode} />,
      enableHiding: true,
    },
    {
      id: 'symptomCodeDescription',
      accessorKey: 'symptomCodeDescription',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Descriptions"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText text={row.original?.symptomCodeDescription} />
      ),
      enableHiding: true,
    },
    {
      id: 'historyType',
      accessorKey: 'historyType',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="History Type"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row.original?.historyType} />,
      enableHiding: true,
    },
    {
      id: 'activeStatus',
      accessorKey: 'activeStatus',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Status"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row.original.activeStatus} />,
      enableHiding: true,
    },
    {
      id: 'notes',
      accessorKey: 'notes',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Notes"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellLongText text={row.original?.notes} />,
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
