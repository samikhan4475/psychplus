import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { Appointment } from '@/types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<Appointment>[] = [
  {
    id: 'follow-up-row-action-delete',
    render: RowActionDelete,
  },
  {
    id: 'follow-up-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: Row<Appointment>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
