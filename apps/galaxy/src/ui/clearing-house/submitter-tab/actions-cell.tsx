import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { ClearingHouseSubmitter } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<ClearingHouseSubmitter>[] = [
  {
    id: 'submitter-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'submitter-list-row-action-delete',
    render: RowActionDelete,
  },
]

interface ActionsCellProps {
  row: Row<ClearingHouseSubmitter>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
