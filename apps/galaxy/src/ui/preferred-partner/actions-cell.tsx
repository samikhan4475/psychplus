import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { RowActionEdit } from './row-action-edit'
import { RowActionMail } from './row-action-mail'
import { Staff } from '../staff-management/types'

type PreferredPartnerRow = Row<Staff>

const rowActions: RowAction<Staff>[] = [
  {
    id: 'preferred-partner-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'preferred-partner-list-row-action-mail',
    render: RowActionMail,
  },
]

interface ActionsCellProps {
  row: PreferredPartnerRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
