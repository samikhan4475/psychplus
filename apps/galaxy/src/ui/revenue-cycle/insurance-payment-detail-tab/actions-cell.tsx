import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { ClaimPayment } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { RowActionHistory } from './row-action-history'

const rowActions: RowAction<ClaimPayment>[] = [
  {
    id: 'check-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'check-list-row-action-delete',
    render: RowActionDelete,
  },
  {
    id: 'check-list-row-action-history',
    render: RowActionHistory,
  },
]

interface ActionsCellProps {
  row: Row<ClaimPayment>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
