import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { Staff } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<Staff>[] = [
  {
    id: 'insurance-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'insurance-list-row-action-delete',
    render: RowActionDelete,
  },
]

interface ActionsCellProps {
  row: Row<Staff>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
