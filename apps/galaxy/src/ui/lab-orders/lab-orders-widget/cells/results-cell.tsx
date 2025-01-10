import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabOrders } from '@/types'
import { RowResultAttachment } from './row-result-attachment'
import { RowResultView } from './row-result-view'

type LabOrderRow = Row<LabOrders>

interface ActionsCellProps {
  row: LabOrderRow
}

const ResultsCell = ({ row }: ActionsCellProps) => {
  const rowActions: RowAction<LabOrders>[] =
    row.original.labDocuments.length === 0
      ? [
          {
            id: 'row-results-view',
            render: RowResultView,
          },
        ]
      : [
          {
            id: 'row-results-view',
            render: RowResultView,
          },
          {
            id: 'row-results-attachment',
            render: RowResultAttachment,
          },
        ]

  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ResultsCell }
