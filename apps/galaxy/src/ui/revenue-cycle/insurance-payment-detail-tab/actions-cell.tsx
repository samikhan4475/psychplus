import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { ClaimPayment } from '../types'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<ClaimPayment>[] = [
  {
    id: 'check-list-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: Row<ClaimPayment>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
