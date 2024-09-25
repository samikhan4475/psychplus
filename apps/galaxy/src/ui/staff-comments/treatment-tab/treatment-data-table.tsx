'use client'

import { SelectOptionType, StaffComment } from '@/types'
import { DataTable, FilterForm, ViewLoadingPlaceholder } from '../shared'

interface TreatmentDataTableProps {
  comments: StaffComment[]
  patientId: string
  staffOptions: SelectOptionType[]
  loading?: boolean
}
const TreatmentDataTable = ({
  comments,
  patientId,
  staffOptions,
  loading,
}: TreatmentDataTableProps) => {
  return (
    <>
      <FilterForm patientId={patientId} staffOptions={staffOptions} />
      {loading ? (
        <ViewLoadingPlaceholder />
      ) : (
        <DataTable data={comments ?? []} />
      )}
    </>
  )
}

export { TreatmentDataTable }
