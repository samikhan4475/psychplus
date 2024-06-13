import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import {
  TableCellLongText,
  TableCellText,
} from 'node_modules/@psychplus/ui/src/table-cell'
import {
  COLUMN_DATE_FORMAT,
  findName,
  Immunization,
  RealCodeSet,
  RealCodesets,
} from '@psychplus/immunization'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { RowActionDropdown } from './row-action-dropdown'

const columns = (realCodeSets: RealCodeSet) => {
  const columns: ColumnDef<Immunization>[] = [
    {
      id: 'datetimeAdministered',
      accessorKey: 'datetimeAdministered',
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
            row.original?.datetimeAdministered
              ? format(
                  new Date(row.original?.datetimeAdministered),
                  COLUMN_DATE_FORMAT,
                )
              : ''
          }
        />
      ),
      enableHiding: true,
    },
    {
      id: 'immunization_name',
      accessorKey: 'immunization_name',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Immunization Name"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText
          text={`${findName(
            RealCodesets.CVX,
            realCodeSets,
            row.original?.cvxCode,
          )}`}
        />
      ),
      enableHiding: true,
    },
    {
      id: 'cvxCode',
      accessorKey: 'cvxCode',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Immunization Code"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={`${row.original?.cvxCode}`} />,
      enableHiding: true,
    },
    {
      id: 'entryType',
      accessorKey: 'entryType',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Entry Type"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <Flex
          align="center"
          justify="center"
          className={
            (row.original.entryType === 'Administered' &&
              'w-24 bg-green-3 text-center') ||
            (row.original.entryType === 'Historical' &&
              'w-24 bg-yellow-2 text-center') ||
            (row.original.entryType === 'Refusal' &&
              'w-24 bg-red-3 text-center') ||
            ''
          }
        >
          <TableCellText
            className={
              (row.original.entryType === 'Administered' && 'text-[#006B3B]') ||
              (row.original.entryType === 'Historical' && 'text-[#783200]') ||
              (row.original.entryType === 'Refusal' && 'text-[red]') ||
              ''
            }
            text={row.original.entryType}
          />
        </Flex>
      ),
      enableHiding: true,
    },
    {
      id: 'mvxCode',
      accessorKey: 'mvxCode',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Manufacture"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row?.original?.mvxCode} />,
      enableHiding: true,
    },
    {
      id: 'administeringUserFullName',
      accessorKey: 'administeringUserFullName',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Administered By"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText text={row.original.administeringUserFullName} />
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
