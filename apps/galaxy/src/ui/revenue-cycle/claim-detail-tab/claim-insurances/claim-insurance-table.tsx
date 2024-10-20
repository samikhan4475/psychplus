import { DataTable } from '@/components'
import { dummyData, columns as getColumns } from './table-columns'

const ClaimInsuranceTable = () => {
  return <DataTable columns={getColumns()} data={dummyData} />
}

export { ClaimInsuranceTable }
