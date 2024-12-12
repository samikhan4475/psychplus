import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { RowActionEdit } from '../row-action-edit'
import { PracticeDetails } from '../types'

const rowActions: RowAction<PracticeDetails>[] = [
  {
    id: 'organization-practices-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: Row<PracticeDetails>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
