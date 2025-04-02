import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'

import { RowActionResolve } from './row-action-resolve'
import { DenialServiceLine } from '../types'


type DenialRow = Row<DenialServiceLine>

const rowActions: RowAction<DenialServiceLine>[] = [
  {
    id: 'denial-list-row-action-resolve',
    render: RowActionResolve,
  },
]

interface ActionsCellProps {
  row: DenialRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
