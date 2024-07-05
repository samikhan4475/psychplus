import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import { TableCellText } from 'node_modules/@psychplus/ui/src/table-cell'
import { CarePlan, DATE_FORMATE } from '@psychplus/care-plans'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellLongText } from '@psychplus/ui/table-cell'
import { CarePlanRowActionDropdown } from './row-action-dropdown'

const columns = () => {
  const columns: ColumnDef<CarePlan>[] = [
    {
      id: 'planStartDate',
      accessorKey: 'planStartDate',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Start Date"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={
            row.original?.planStartDate
              ? format(new Date(row.original?.planStartDate), DATE_FORMATE)
              : ''
          }
        />
      ),
      enableHiding: true,
    },
    {
      id: 'planEndDate',
      accessorKey: 'planEndDate',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="End Date"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={
            row.original?.planEndDate
              ? format(new Date(row.original?.planEndDate), DATE_FORMATE)
              : ''
          }
        />
      ),
      enableHiding: true,
    },
    {
      id: 'planCode',
      accessorKey: 'planCode',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Code"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row.original?.planCode} />,
      enableHiding: true,
    },
    {
      id: 'planCodeDescription',
      accessorKey: 'planCodeDescription',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Descriptions"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText text={row.original?.planCodeDescription} />
      ),
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
      cell: ({ row }) => <TableCellLongText text={row.original.notes} />,
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
          <CarePlanRowActionDropdown data={row.original} />
        </Flex>
      ),
    },
  ]
  return columns
}
export { columns }
