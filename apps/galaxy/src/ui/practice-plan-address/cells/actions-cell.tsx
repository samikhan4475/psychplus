import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'

import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { PracticePlanAddress } from '../types'

interface ActionsCellProps {
  row: Row<PracticePlanAddress>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const rowActions: RowAction<PracticePlanAddress>[] = [
    {
      id: 'plan-address-list-row-action-edit',
      render: RowActionEdit,
    },
    {
      id: 'plan-address-list-row-action-delete',
      render: RowActionDelete,
    },
  ]
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
