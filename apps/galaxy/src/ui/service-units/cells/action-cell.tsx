import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { DeleteGroupAction } from '../row-action-delete'
import { RowActionEdit } from '../row-action-edit'
import { ServiceUnit } from '../types'

const rowActions: RowAction<ServiceUnit>[] = [
  {
    id: 'service-unit-row-action-delete',
    render: DeleteGroupAction,
  },
  {
    id: 'service-unit-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: Row<ServiceUnit>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
