import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { Organization } from '../types'
import { RowActionAddPractice } from './row-action-add-practice'
import { RowActionEdit } from './row-action-edit'

type OrganizationRow = Row<Organization>

const rowActions: RowAction<Organization>[] = [
  {
    id: 'organization-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'organization-list-row-action-add-practice',
    render: RowActionAddPractice,
  },
]

interface ActionsCellProps {
  row: OrganizationRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
