import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import {
  TableCellLongText,
  TableCellText,
} from 'node_modules/@psychplus/ui/src/table-cell'
import { PatientPlanOfTreatment } from '@psychplus/assessment-and-treatment-plan/types'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { RowActionDropdown } from './row-action-dropdown'

const columns = (isEditing: boolean) => {
  const DATE_FORMAT = 'MM/dd/yyyy'
  const columns: ColumnDef<PatientPlanOfTreatment>[] = [
    {
      id: 'planDate',
      accessorKey: 'planDate',
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
            row.original?.planDate
              ? format(new Date(row.original?.planDate), DATE_FORMAT)
              : ''
          }
        />
      ),
      enableHiding: true,
    },
    {
      id: 'symptomCode',
      accessorKey: 'symptomCode',
      size: 20,
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
      size: 20,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Description"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText text={row.original?.symptomCodeDescription} />
      ),
      enableHiding: true,
    },
    {
      id: 'planType',
      accessorKey: 'planType',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Type"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <Flex align="center" justify="center">
          <TableCellText text={row.original?.planType} />
        </Flex>
      ),
      enableHiding: true,
    },
  ]

  if (isEditing) {
    columns.push({
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
    })
  }
  return columns
}
export { columns }
