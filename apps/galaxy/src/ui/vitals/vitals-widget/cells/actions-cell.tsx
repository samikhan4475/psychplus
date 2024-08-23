import { RowActionsCell, type RowAction } from '@/components'
import type { PatientVital, PatientVitalRow } from '../types'
import { RowActionDetails } from './row-action-details'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<PatientVital>[] = [
  {
    id: 'patient-vitals-row-action-details',
    render: RowActionDetails,
  },
  {
    id: 'patient-vitals-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: PatientVitalRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionsCell row={row} actions={rowActions} />
}

export { ActionsCell }
