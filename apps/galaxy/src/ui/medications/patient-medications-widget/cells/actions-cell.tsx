import { type Row } from '@tanstack/react-table'
import { PatientMedication } from '../types'
import { AdaptiveRowActionsCell, RowAction } from '@/components'
import { RowActionRefresh } from './row-action-refresh'
import { RowActionCancel } from './row-action-cancel'

const getRowActions = (scriptSureAppUrl: string, row: Row<PatientMedication>): RowAction<PatientMedication>[] => [
  {
    id: 'pharmacy-list-row-action-cancel',
    render: () => <RowActionCancel  row={row} />,
  },
  {
    id: 'pharmacy-list-row-action-refresh',
    render: () => <RowActionRefresh scriptSureAppUrl={scriptSureAppUrl} row={row} />,
  },
]
interface ActionsCellProps {
  row: Row<PatientMedication>,
  scriptSureAppUrl: string
}

const ActionsCell = ({ row, scriptSureAppUrl }: ActionsCellProps) => {
  const rowActions = getRowActions(scriptSureAppUrl, row)
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }

