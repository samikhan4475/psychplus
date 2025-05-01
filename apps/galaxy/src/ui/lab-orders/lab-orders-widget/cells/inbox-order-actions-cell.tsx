import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabOrders } from '@/types'
import { LabOrderRow } from '../types'
import { RowResultAttachment } from './row-result-attachment'

const rowActions: RowAction<LabOrders>[] = [
  {
    id: 'row-results-attachment',
    render: RowResultAttachment,
  }
]

interface ActionsCellProps {
  row: LabOrderRow
}

const InboxOrderActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { InboxOrderActionsCell }
