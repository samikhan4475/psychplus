import { DataTable } from '../shared'
import { StaffComment } from '../types'
import { BillingFilterForm } from './billing-filter-form'

interface BillingDataTableProps {
  comments: StaffComment[]
}

const BillingDataTable = ({ comments }: BillingDataTableProps) => {
  return (
    <>
      <BillingFilterForm />
      <DataTable data={comments ?? []} />
    </>
  )
}

export { BillingDataTable }
