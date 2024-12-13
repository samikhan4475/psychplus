import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabResult } from '@/types'
import { LabResultRow } from '../types'
import { ViewActionEdit } from './view-action-edit'

const rowActions: RowAction<LabResult>[] = [
  {
    id: 'lab-orders-row-action-edit',
    render: ViewActionEdit,
  },
]

interface ActionsCellProps {
  row: LabResultRow
}

const ViewActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ViewActionsCell }
