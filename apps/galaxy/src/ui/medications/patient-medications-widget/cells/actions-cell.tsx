import { type Row } from '@tanstack/react-table'
import { PatientMedication } from '../types'
import { AdaptiveRowActionsCell, RowAction } from '@/components'
import { RowActionRefresh } from './row-action-refresh'
import { RowActionCancel } from './row-action-cancel'

const rowActions: RowAction<PatientMedication>[] = [
  {
    id: 'pharmacy-list-row-action-cancel',
    render: RowActionCancel,
  },
  {
    id: 'pharmacy-list-row-action-refresh',
    render: RowActionRefresh,
  },
]
interface ActionsCellProps {
  row: Row<PatientMedication>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }

