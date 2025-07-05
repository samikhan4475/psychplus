'use client'

import { AdaptiveRowActionsCell, PropsWithRow, RowAction } from '@/components'
import { PatientMedication } from '../types'
import { RowActionCancel } from './row-action-cancel'
import { RowActionCheckbox } from './row-action-checkbox'
import { RowActionEdit } from './row-action-edit'
import { RowActionRefresh } from './row-action-refresh'

interface ActionsCellProps extends PropsWithRow<PatientMedication> {
  onEditClick: (medication: PatientMedication) => void
}

const ActionsCell = ({ row, onEditClick }: ActionsCellProps) => {
  const rowActions: RowAction<PatientMedication>[] = [
    { 
      id: 'row-action-cancel',
      render: RowActionCancel,
    },
    {
      id: 'row-action-refresh',
      render: (props) => (
        <RowActionRefresh {...props} onEditClick={onEditClick} />
      ),
    },
    {
      id: 'row-action-edit',
      render: (props) => <RowActionEdit {...props} onEditClick={onEditClick} />,
    },
  ]

  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
