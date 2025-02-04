import { type Row } from '@tanstack/react-table'
import type { AllergyDataResponse } from '../types'
import { RowActionEdit } from './row-action-edit'

interface ActionsCellProps {
  row: Row<AllergyDataResponse>,
  scriptSureAppUrl: string
}

const ActionsCell = ({ row, scriptSureAppUrl }: ActionsCellProps) => {
  return <RowActionEdit scriptSureAppUrl={scriptSureAppUrl}/>
}

export { ActionsCell }
