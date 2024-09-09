import { DataTable } from '../shared'
import { StaffComment } from '../types'
import { TreatmentFilterForm } from './filter-form'

interface TreatmentDataTableProps {
  comments: StaffComment[]
}
const TreatmentDataTable = ({ comments }: TreatmentDataTableProps) => {
  return (
    <>
      <TreatmentFilterForm />
      <DataTable data={comments ?? []} />
    </>
  )
}

export { TreatmentDataTable }
