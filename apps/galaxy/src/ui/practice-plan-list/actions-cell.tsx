import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { RowActionEdit } from './row-action-edit'
import { InsurancePlanItem } from './types'

const rowActions: RowAction<InsurancePlanItem>[] = [
  {
    id: 'insurance-list-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: Row<InsurancePlanItem>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
