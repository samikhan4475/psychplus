import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabOrders } from '@/types'
import { RowResultDetail } from '../row-result-detail'

type LabOrderRow = Row<LabOrders>

interface ActionsCellProps {
  row: LabOrderRow
}

const InboxOrderActionsCell = ({ row }: ActionsCellProps) => {
  const rowActions: RowAction<LabOrders>[] =
    [
      {
        id: 'row-results-detail',
        render: RowResultDetail,
      },
    ]

  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { InboxOrderActionsCell }
