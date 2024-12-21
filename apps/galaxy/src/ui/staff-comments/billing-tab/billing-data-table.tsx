'use client'

import { SelectOptionType, StaffComment } from '@/types'
import { DataTable, FilterForm, ViewLoadingPlaceholder } from '../shared'

interface BillingDataTableProps {
  comments: StaffComment[]
  staffOptions: SelectOptionType[]
  loading: boolean
}

const BillingDataTable = ({
  comments,
  staffOptions,
  loading,
}: BillingDataTableProps) => {
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

export { BillingDataTable }
