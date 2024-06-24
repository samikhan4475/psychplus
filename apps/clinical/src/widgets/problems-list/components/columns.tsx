import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import { TableCellText } from 'node_modules/@psychplus/ui/src/table-cell'
import { Problem, RealCodeSet } from '@psychplus/problems'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { RowActionDropdown } from './row-action-dropdown'
import { TableCellLongText } from './table-cell-long-text'
import { findName } from './utils'

const columns = (realCodeSets: RealCodeSet) => {
  const DATE_TIME_FORMATE = 'MM/dd/yyyy hh:mm a'
  const DATE_FORMATE = 'MM/dd/yyyy'

  const columns: ColumnDef<Problem>[] = [
    {
      id: 'problemDate',
      accessorKey: 'problemDate',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Date & Time"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={
            row.original?.problemDate
              ? format(new Date(row.original?.problemDate), DATE_TIME_FORMATE)
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
      cell: ({ row }) => (
        <TableCellLongText
          maxWidth={100}
          text={row.original.symptomCode}
          row={row.original}
        />
      ),
      enableHiding: true,
    },
    {
      id: 'symptomCodeDescription',
      accessorKey: 'symptomCodeDescription',
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
          text={row.original.symptomCodeDescription}
          row={row.original}
        />
      ),
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
      cell: ({ row }) => (
        <Flex align="center" justify="center">
          <TableCellText text={row.original.activeStatus} />
        </Flex>
      ),
      enableHiding: true,
    },
    {
      id: 'severity',
      accessorKey: 'severity',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Severity"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row.original.severity} />,
      enableHiding: true,
    },
    {
      id: 'chronicity',
      accessorKey: 'chronicity',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Chronicity"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row.original.chronicity} />,
      enableHiding: true,
    },
    {
      id: 'symptomCodesetUsed',
      accessorKey: 'symptomCodesetUsed',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Coding System"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText text={row.original.symptomCodesetUsed} />
      ),
      enableHiding: true,
    },
    {
      id: 'problemType',
      accessorKey: 'problemType',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Prob Type"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={findName(
            'PHVS_ProblemType_HITSP',
            realCodeSets,
            row.original.problemType,
          )}
        />
      ),
      enableHiding: true,
    },
    {
      id: 'resolvedDate',
      accessorKey: 'resolvedDate',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Resolved Date"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={
            row.original?.resolvedDate
              ? format(new Date(row.original?.resolvedDate), DATE_FORMATE)
              : ''
          }
        />
      ),
      enableHiding: true,
    },
    {
      id: 'comments',
      accessorKey: 'comments',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Notes"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellLongText text={row.original.comments} />,
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
