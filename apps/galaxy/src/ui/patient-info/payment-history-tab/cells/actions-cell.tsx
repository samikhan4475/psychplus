'use client'

import { RowAction, RowActionsCell } from '@/components'
import { PaymentHistory, PaymentHistoryRow } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<PaymentHistory>[] = [
  {
    id: 'payment-history-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'payment-history-row-action-delete',
    render: RowActionDelete,
  },
]

interface ActionsCellProps {
  row: PaymentHistoryRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionsCell row={row} actions={rowActions} />
}

export { ActionsCell }
