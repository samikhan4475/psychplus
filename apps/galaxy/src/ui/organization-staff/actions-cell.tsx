import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { RowActionAddPractice } from './row-action-add'
import { RowActionEdit } from './row-action-edit'
import { Staff } from './types'

type OrganizationRow = Row<Staff>

const rowActions: RowAction<Staff>[] = [
  {
    id: 'organization-list-row-action-delete',
    render: RowActionAddPractice,
  },
  {
    id: 'organization-list-row-action-edit',
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
