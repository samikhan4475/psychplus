import { RowActionsCell, type RowAction } from '@/components'
import type { PatientAllergy, PatientAllergyRow } from '../types'
import { RowActionDetails } from './row-action-details'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<PatientAllergy>[] = [
  {
    id: 'patient-allergies-row-action-details',
    render: RowActionDetails,
  },
  {
    id: 'patient-allergies-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: PatientAllergyRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionsCell row={row} actions={rowActions} />
}

export { ActionsCell }
