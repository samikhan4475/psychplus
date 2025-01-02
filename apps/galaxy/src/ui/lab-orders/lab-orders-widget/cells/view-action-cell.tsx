import { Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabResult } from '@/types'
import { ViewActionEdit } from './view-action-edit'

const rowActions: RowAction<LabResult>[] = [
  {
    id: 'lab-orders-row-action-edit',
    render: ViewActionEdit,
  },
]

interface ActionsCellProps {
  row: Row<LabResult>
}

const ViewActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ViewActionsCell }
