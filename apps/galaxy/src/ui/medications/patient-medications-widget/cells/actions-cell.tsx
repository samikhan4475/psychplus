import {
  AdaptiveRowActionsCell,
  type PropsWithRow,
  type RowAction,
} from '@/components'
import { PatientMedication } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { RowActionRefresh } from './row-action-refresh'

const rowActions: RowAction<PatientMedication>[] = [
  {
    id: 'pharmacy-list-row-action-delete',
    render: RowActionDelete,
  },
  {
    id: 'pharmacy-list-row-action-refresh',
    render: RowActionRefresh,
  },
  {
    id: 'pharmacy-list-row-action-edit',
    render: RowActionEdit,
  },
]

const ActionsCell = ({ row }: PropsWithRow<PatientMedication>) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
