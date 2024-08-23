import { RowActionsCell, type RowAction } from '@/components'
import type { PatientMedication, PatientMedicationRow } from '../types'
import { RowActionDetails } from './row-action-details'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<PatientMedication>[] = [
  {
    id: 'patient-medications-row-action-details',
    render: RowActionDetails,
  },
  {
    id: 'patient-medications-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: PatientMedicationRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionsCell row={row} actions={rowActions} />
}

export { ActionsCell }
