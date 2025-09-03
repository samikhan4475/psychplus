import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { DeleteRoomAction } from '../row-action-delete'
import { RowActionEdit } from '../row-action-edit'
import { ServiceRoom } from '../types'

const rowActions: RowAction<ServiceRoom>[] = [
  {
    id: 'service-room-row-action-delete',
    render: DeleteRoomAction,
  },
  {
    id: 'service-room-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: Row<ServiceRoom>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
