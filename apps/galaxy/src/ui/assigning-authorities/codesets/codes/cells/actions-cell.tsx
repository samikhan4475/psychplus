import { type Row } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { Code } from '@/ui/assigning-authorities/types'
import { AddNewRowActionSave, EditableRowActionSave, RowActionCancel } from '.'
import { CodesetCodeAction } from '../../constants'
import { SchemaType } from '../code-schema'
import { RowActionEdit } from './row-action-edit'
import { RowActionManageAttributes } from './row-action-manage-attributes'

const rowActions: RowAction<Code>[] = [
  {
    id: 'codeset-codes-row-action-manage-attributes',
    render: RowActionManageAttributes,
  },
  {
    id: 'codeset-codes-row-action-edit',
    render: RowActionEdit,
  },
]

const editableRowActions: RowAction<Code>[] = [
  {
    id: 'codeset-codes-editable-row-action-cancel',
    render: () => RowActionCancel(CodesetCodeAction.Edit),
  },
  {
    id: 'codeset-codes-editable-row-action-save',
    render: (row) => EditableRowActionSave(row),
  },
]

const addNewRowActions: RowAction<Code>[] = [
  {
    id: 'codeset-codes-new-row-action-cancel',
    render: () => RowActionCancel(CodesetCodeAction.New),
  },
  {
    id: 'codeset-codes-new-row-action-save',
    render: () => AddNewRowActionSave(),
  },
]

interface ActionsCellProps {
  row: Row<Code>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  let actionsList = rowActions

  const form = useFormContext<SchemaType>()

  if (form.watch('editableCodesetCode')?.id === row.original.id) {
    actionsList = editableRowActions
  } else if (form.watch('newCodesetCode') !== undefined && row.index === 0) {
    actionsList = addNewRowActions
  }

  return <AdaptiveRowActionsCell actions={actionsList} row={row} />
}

export { ActionsCell }
