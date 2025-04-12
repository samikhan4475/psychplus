import { type Row } from '@tanstack/react-table'
import { RowActionEdit } from '../row-action-edit'
import { ScheduledReport } from '../types'

interface ActionsCellProps {
  row: Row<ScheduledReport>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionEdit row={row} />
}

export { ActionsCell }
