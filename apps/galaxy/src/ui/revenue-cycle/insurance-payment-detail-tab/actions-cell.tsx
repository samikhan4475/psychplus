import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { ClaimPayment } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { RowActionHistory } from './row-action-history'
import { RowActionPaymentPost } from './row-action-payment-post'
import { RowActionPostPayment } from './row-action-post-payment'

const rowActions = (includeUnlinked?: boolean): RowAction<ClaimPayment>[] => [
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
  {
    id: 'check-list-row-action-post',
    render: RowActionPostPayment,
  },
  ...(includeUnlinked
    ? [
        {
          id: 'unlink-list-row-action-markPosted',
          render: RowActionPaymentPost,
        },
      ]
    : []),
]

interface ActionsCellProps {
  row: Row<ClaimPayment>
  includeUnlinked?: boolean
}

const ActionsCell = ({ row, includeUnlinked }: ActionsCellProps) => {
  return (
    <AdaptiveRowActionsCell actions={rowActions(includeUnlinked)} row={row} />
  )
}

export { ActionsCell }
