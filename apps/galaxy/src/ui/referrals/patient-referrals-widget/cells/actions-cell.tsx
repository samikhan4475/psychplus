import { RowActionsCell, type RowAction } from '@/components'
import type { PatientReferral, PatientReferralRow } from '../types'
import { RowActionDetails } from './row-action-details'
import { RowActionEdit } from './row-action-edit'

const rowActions: RowAction<PatientReferral>[] = [
  {
    id: 'patient-referrals-row-action-details',
    render: RowActionDetails,
  },
  {
    id: 'patient-referrals-row-action-edit',
    render: RowActionEdit,
  },
]

interface ActionsCellProps {
  row: PatientReferralRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionsCell row={row} actions={rowActions} />
}

export { ActionsCell }
