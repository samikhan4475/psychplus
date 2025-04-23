'use client'

import { AdaptiveRowActionsCell, PropsWithRow, RowAction } from '@/components'
import { PatientMedication } from '../types'
import { RowActionCancel } from './row-action-cancel'
// import { RowActionCheckbox } from './row-action-checkbox'
// import { RowActionEdit } from './row-action-edit'
import { RowActionRefresh } from './row-action-refresh'

const rowActions: RowAction<PatientMedication>[] = [
  {
    id: 'row-action-cancel',
    render: RowActionCancel,
  },
  {
    id: 'row-action-refresh',
    render: RowActionRefresh,
  },
  // {
  //   id: 'row-action-edit',
  //   render: RowActionEdit,
  // },
  // {
  //   id: 'row-action-check',
  //   render: RowActionCheckbox,
  // },
]
const ActionsCell = ({ row }: PropsWithRow<PatientMedication>) => (
  <AdaptiveRowActionsCell actions={rowActions} row={row} />
)

export { ActionsCell }
