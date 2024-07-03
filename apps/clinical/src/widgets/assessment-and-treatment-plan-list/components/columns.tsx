import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import { TableCellText } from 'node_modules/@psychplus/ui/src/table-cell'
import { AssessmentAndTreatment } from '@psychplus/assessment-and-treatment-plan/types'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { RowActionDropdown } from './row-action-dropdown'

const columns = () => {
  const DATE_FORMAT = 'MM/dd/yyyy'
  const columns: ColumnDef<AssessmentAndTreatment>[] = [
    {
      id: 'date',
      accessorKey: 'date',
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
            row.original?.assessmentPlanDate
              ? format(new Date(row.original?.assessmentPlanDate), DATE_FORMAT)
              : ''
          }
        />
      ),
      enableHiding: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
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
          <TableCellText text={row.original.status} />
        </Flex>
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
