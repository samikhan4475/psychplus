import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { ResponseHistoryRecord } from '../types'
import { RowActionView } from './row-action-view'

type RecordRow = Row<ResponseHistoryRecord>

const rowActions: RowAction<ResponseHistoryRecord>[] = [
  {
    id: 'response-history-row-action-view',
    render: RowActionView,
  },
]

interface ActionsCellProps {
  row: RecordRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
