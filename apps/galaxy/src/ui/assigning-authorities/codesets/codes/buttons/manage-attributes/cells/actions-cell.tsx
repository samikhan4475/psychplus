import { Row } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { CodeAttribute } from '@/ui/assigning-authorities/types'
import { SchemaType } from '../manage-attributes-form'
import { RowActionCancel } from './row-action-cancel'
import { RowActionEdit } from './row-action-edit'

interface ActionsCellProps {
  shouldEditManageAttribute?: boolean
  row: Row<CodeAttribute>
}

const ActionsCell = ({ row, shouldEditManageAttribute }: ActionsCellProps) => {
  let rowActions: RowAction<CodeAttribute>[]
  const form = useFormContext<SchemaType>()

  if (
    form.watch('id') === row.original.id ||
    (form.watch('id') === 'new' && row.index === 0)
  ) {
    rowActions = [
      {
        id: 'manage-attributes-row-action-cancel',
        render: RowActionCancel,
      },
    ]
  } else {
    rowActions = [
      {
        id: 'manage-attributes-row-action-edit',
        render: RowActionEdit,
      },
    ]
  }
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
