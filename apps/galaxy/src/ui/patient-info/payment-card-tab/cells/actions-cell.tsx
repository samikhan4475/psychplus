import { RowActionsCell, type RowAction } from '@/components'
import { CreditCard, CardRow } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionPrimary } from './row-action-primary'

const rowActions: RowAction<CreditCard>[] = [
  {
    id: 'paymants-cards-action-primary',
    render: RowActionPrimary,
  },
  {
    id: 'paymants-cards-action-delete',
    render: RowActionDelete,
  },
]

interface ActionsCellProps {
  row: CardRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionsCell row={row} actions={rowActions} />
}

export { ActionsCell }
