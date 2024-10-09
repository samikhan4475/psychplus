import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import type { Claim } from '@/types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

type ClaimRow = Row<Claim>

const rowActions: RowAction<Claim>[] = [
  {
    id: 'claim-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'claim-list-row-action-delete',
    render: RowActionDelete,
  },
]

interface ActionsCellProps {
  row: ClaimRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
