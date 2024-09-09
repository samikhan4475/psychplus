'use client'

import { RowActionsCell, type RowAction } from '@/components'
import { BillingHistory, BillingHistoryRow } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<BillingHistory>[] = [
  {
    id: 'billing-history-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'billing-history-row-action-delete',
    render: RowActionDelete,
  },
]

interface ActionsCellProps {
  row: BillingHistoryRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionsCell row={row} actions={rowActions} />
}

export { ActionsCell }
