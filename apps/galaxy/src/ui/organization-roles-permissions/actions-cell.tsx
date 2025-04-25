import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { Role } from '@/types'
import { RowActionAddPractice } from './row-action-add'
import { RowActionEdit } from './row-action-edit'

type OrganizationRow = Row<Role>

const rowActions: RowAction<Role>[] = [
  {
    id: 'organization-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'organization-list-row-action-delete',
    render: RowActionAddPractice,
  },
]

interface ActionsCellProps {
  row: OrganizationRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return (
    row.original.organizationId && (
      <AdaptiveRowActionsCell actions={rowActions} row={row} />
    )
  )
}

export { ActionsCell }
