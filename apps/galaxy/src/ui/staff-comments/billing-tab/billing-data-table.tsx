'use client'

import { SelectOptionType, StaffComment } from '@/types'
import { DataTable, FilterForm, ViewLoadingPlaceholder } from '../shared'

interface BillingDataTableProps {
  comments: StaffComment[]
  staffOptions: SelectOptionType[]
  patientId: string
  loading: boolean
}

const BillingDataTable = ({
  comments,
  patientId,
  staffOptions,
  loading,
}: BillingDataTableProps) => {
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

export { BillingDataTable }
