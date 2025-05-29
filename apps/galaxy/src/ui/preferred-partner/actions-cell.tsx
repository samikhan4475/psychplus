import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { RowActionEdit } from './row-action-edit'
import { RowActionMail } from './row-action-mail'
import { PreferredPartnerItem } from './types'

type PreferredPartnerRow = Row<PreferredPartnerItem>

const rowActions: RowAction<PreferredPartnerItem>[] = [
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
