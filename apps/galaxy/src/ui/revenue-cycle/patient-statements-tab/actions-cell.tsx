import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { PatientStatement } from '../types'
import { RowActionDownload } from './row-action-download'
import { RowActionView } from './row-action-view'

type RecordRow = Row<PatientStatement>

const rowActions: RowAction<PatientStatement>[] = [
  {
    id: 'patient-statement-list-row-action-view',
    render: RowActionView,
  },
  {
    id: 'patient-statement-list-row-action-download',
    render: RowActionDownload,
  },
]

interface ActionsCellProps {
  row: RecordRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
