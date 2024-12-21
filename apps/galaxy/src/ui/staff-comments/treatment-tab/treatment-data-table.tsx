'use client'

import { SelectOptionType, StaffComment } from '@/types'
import { DataTable, FilterForm, ViewLoadingPlaceholder } from '../shared'

interface TreatmentDataTableProps {
  comments: StaffComment[]
  staffOptions: SelectOptionType[]
  loading?: boolean
}
const TreatmentDataTable = ({
  comments,
  staffOptions,
  loading,
}: TreatmentDataTableProps) => {
  return (
    <>
      <FilterForm staffOptions={staffOptions} />
      {loading ? (
        <ViewLoadingPlaceholder />
      ) : (
        <DataTable data={comments ?? []} />
      )}
    </>
  )
}

export { TreatmentDataTable }
