import { DataTable } from '@/components'
import { columns as getColumns } from './table-columns'

const SubmissionResponseTable = () => {
  return <DataTable columns={getColumns()} data={[]} />
}

export { SubmissionResponseTable }
