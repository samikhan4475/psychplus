import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import format from 'date-fns/format'
import {
  TableCellLongText,
  TableCellText,
} from 'node_modules/@psychplus/ui/src/table-cell'
import {
  AssessmentAndTreatment,
  PatientAssessment,
} from '@psychplus/assessment-and-treatment-plan/types'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { RowActionDropdown } from './row-action-dropdown'

const columns = (isEditing: boolean) => {
  const columns: ColumnDef<PatientAssessment>[] = [
    {
      id: 'assessment',
      accessorKey: 'assessment',
      size: 20,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="assessment"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellLongText text={row.original.assessment} />,
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
