import { type Row } from '@tanstack/react-table'
import { CredentialingManager } from '../../types'
import { RowActionEdit } from '../row-action-edit'

interface ActionsCellProps {
  row: Row<CredentialingManager>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <RowActionEdit row={row} />
}

export { ActionsCell }
