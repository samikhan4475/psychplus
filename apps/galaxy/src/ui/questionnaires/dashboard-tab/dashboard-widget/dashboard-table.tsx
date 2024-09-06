'use client'

import { ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable } from '@/components'
import { ActionsCell, AddToPreVisitAssessmentCell, TestNameCell } from './cells'
import type { QuestionnairesDashboard } from './types'

const columns: ColumnDef<QuestionnairesDashboard>[] = [
  {
    id: 'test-name',
    header: () => <ColumnHeader label="Test Name" />,
    cell: ({ row }) => {
      return <TestNameCell>{row.original.testName}</TestNameCell>
    },
  },
  {
    id: 'add-to-pre-visit-assessment',
    header: () => <ColumnHeader label="Add to Pre-visit Assessment" />,
    cell: AddToPreVisitAssessmentCell,
  },
  {
    id: 'send-to-patient',
    header: () => <ColumnHeader label="Send to Patient" />,
    cell: ActionsCell,
  },
]

const DashboardTable = ({
  questionnairesDashboardData,
}: {
  questionnairesDashboardData: QuestionnairesDashboard[]
}) => {
  return (
    <ScrollArea>
      <DataTable
        data={questionnairesDashboardData ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { DashboardTable }
