import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { DeleteGroupAction } from '../row-action-delete'
import { RowActionEdit } from '../row-action-edit'
import { ServiceGroup } from '../types'

const rowActions: RowAction<ServiceGroup>[] = [
  {
    id: 'organization-practices-row-action-chat',
    render: DeleteGroupAction,
  },
  {
    id: 'organization-practices-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: Row<ServiceGroup>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
