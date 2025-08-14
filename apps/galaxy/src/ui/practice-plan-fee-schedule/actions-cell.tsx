import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { RowActionEdit } from './row-action-edit'
import { FeeSchedule } from './types'

type OrganizationRow = Row<FeeSchedule>

const rowActions: RowAction<FeeSchedule>[] = [
  {
    id: 'row-action-delete',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: OrganizationRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
