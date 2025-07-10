import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { ClaimPayment } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { RowActionHistory } from './row-action-history'
import { RowActionPaymentPost } from './row-action-payment-post'

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

const unLinkrowActions: RowAction<ClaimPayment>[] = [
  {
    id: 'unlink-list-row-action-markPosted',
    render: RowActionPaymentPost,
  },
]

interface ActionsCellProps {
  row: Row<ClaimPayment>
  includeUnlinked?: boolean
}

const ActionsCell = ({ row, includeUnlinked }: ActionsCellProps) => {
  return (
    <AdaptiveRowActionsCell
      actions={includeUnlinked ? unLinkrowActions : rowActions}
      row={row}
    />
  )
}

export { ActionsCell }
