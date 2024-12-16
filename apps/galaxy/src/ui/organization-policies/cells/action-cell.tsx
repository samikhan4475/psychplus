import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { RowActionChat } from '../row-action-chat'
import { Policy } from '../types'
import { RowActionMail } from '../row-action-mail'
import { RowActionDownload } from '../row-action-download'

const rowActions: RowAction<Policy>[] = [
  {
    id: 'organization-practices-row-action-chat',
    render: RowActionChat,
  },
  {
    id: 'organization-practices-row-action-mail',
    render: RowActionMail,
  },
  {
    id: 'organization-practices-row-action-download',
    render: RowActionDownload,
  },
]

interface ActionsCellProps {
  row: Row<Policy>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
