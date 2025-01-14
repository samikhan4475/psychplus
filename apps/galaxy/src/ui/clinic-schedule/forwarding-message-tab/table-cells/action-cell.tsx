import { AdaptiveRowActionsCell, PropsWithRow } from '@/components'
import { ForwardingMessage } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const ActionCell = ({ row }: PropsWithRow<ForwardingMessage>) => {
  const actions = [
    {
      id: 'edit',
      render: RowActionEdit,
    },
    {
      id: 'delete',
      render: RowActionDelete,
    },
  ]
  return <AdaptiveRowActionsCell row={row} actions={actions} />
}

export { ActionCell }
