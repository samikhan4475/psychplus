import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { VisitsList } from '../types'
import { RowActionEdit } from './row-action-edit'
import { RowActionView } from './row-action-view'

type VisitListRow = Row<VisitsList>

const rowActions: RowAction<VisitsList>[] = [
  {
    id: 'treatment-team-visit-row-action-view',
    render: RowActionView,
  },
  {
    id: 'treatment-team-visit-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: VisitListRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
