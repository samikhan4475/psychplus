import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { ClaimSubmissionHistory } from '../types'
import { RowActionDetail } from './row-action-detail'
import { RowActionDownload } from './row-action-download'

type ClaimRow = Row<ClaimSubmissionHistory>

const rowActions: RowAction<ClaimSubmissionHistory>[] = [
  {
    id: 'submission-history-row-action-detail',
    render: RowActionDetail,
  },
  {
    id: 'submission-history-row-action-download',
    render: RowActionDownload,
  },
]

interface ActionsCellProps {
  row: ClaimRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
