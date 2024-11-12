import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { EdiItem } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<EdiItem>[] = [
  {
    id: 'receiver-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'receiver-list-row-action-delete',
    render: RowActionDelete,
  },
]

interface ActionsCellProps {
  row: Row<EdiItem>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
