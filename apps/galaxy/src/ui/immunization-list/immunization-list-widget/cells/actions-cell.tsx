'use client'

import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { ImmunizationDataResponse } from '../types'
import { RowActionEdit } from './row-action-edit'
import { RowActionDelete } from './row-action-delete'

type ImmunizationRow = Row<ImmunizationDataResponse>

const rowActions: RowAction<ImmunizationDataResponse>[] = [
  { id: 'row-action-delete', render: RowActionDelete },
  { id: 'row-action-edit', render: RowActionEdit },
]

interface ActionsCellProps {
  row: ImmunizationRow
}

const ActionsCell = ({ row }: ActionsCellProps) => (
  <AdaptiveRowActionsCell actions={rowActions} row={row} />
)

export { ActionsCell }
