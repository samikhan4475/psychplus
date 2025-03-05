import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { InsurancePayment } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { RowActionHistory } from './row-action-history'

const rowActions: RowAction<InsurancePayment>[] = [
  {
    id: 'insurance-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'insurance-list-row-action-delete',
    render: RowActionDelete,
  },
  {
    id: 'insurance-list-row-action-history',
    render: RowActionHistory,
  },
]

interface ActionsCellProps {
  row: Row<InsurancePayment>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
