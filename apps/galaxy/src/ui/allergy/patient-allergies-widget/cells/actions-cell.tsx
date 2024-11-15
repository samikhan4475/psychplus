import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import type { AllergyDataResponse } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionDetails } from './row-action-details'
import { RowActionEdit } from './row-action-edit'

const actions = [
  { id: 'Details', render: RowActionDetails },
  {
    id: 'Edit',
    render: RowActionEdit,
  },
  {
    id: 'Delete',
    render: RowActionDelete,
  },
] as RowAction<AllergyDataResponse>[]

interface ActionsCellProps {
  row: Row<AllergyDataResponse>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell row={row} actions={actions} />
}

export { ActionsCell }
