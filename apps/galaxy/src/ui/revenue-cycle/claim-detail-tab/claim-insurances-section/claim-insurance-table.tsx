import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataTable, FormFieldError } from '@/components'
import { columns as getColumns } from './table-columns'

const ClaimInsuranceTable = () => {
  const { watch } = useFormContext()
  const claimInsurancePolicies = watch('claimInsurancePolicies') || []
  const [editRowId, setEditRowId] = useState<number | null>(null)

  const columns = getColumns(editRowId, setEditRowId)

  return (
    <>
      <DataTable columns={columns} data={claimInsurancePolicies} />
      <FormFieldError name="primaryPatientInsurancePolicyId" />
    </>
  )
}

export { ClaimInsuranceTable }
