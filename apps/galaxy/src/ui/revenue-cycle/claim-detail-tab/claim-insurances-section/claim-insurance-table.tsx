import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataTable, FormFieldError } from '@/components'
import { InsuranceClaimPolicy } from '@/types'
import { ClaimUpdateSchemaType } from '../schema'
import { columns as getColumns } from './table-columns'

const ClaimInsuranceTable = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const {
    formState: { isSubmitSuccessful },
  } = form

  const claimInsurancePolicies = form.watch('claimInsurancePolicies') ?? []
  const [editRowId, setEditRowId] = useState<number | null>(null)

  const columns = getColumns(editRowId, setEditRowId)
  const transformedInsurances = useMemo(() => {
    return claimInsurancePolicies.map((insurance) => ({
      ...insurance,
      viewHcfa: true,
    })) as InsuranceClaimPolicy[]
  }, [claimInsurancePolicies])

  useEffect(() => {
    if (isSubmitSuccessful) {
      setEditRowId(null)
    }
  }, [isSubmitSuccessful])
  return (
    <>
      <DataTable columns={columns} data={transformedInsurances} />
      <FormFieldError name="primaryPatientInsurancePolicyId" />
    </>
  )
}

export { ClaimInsuranceTable }
