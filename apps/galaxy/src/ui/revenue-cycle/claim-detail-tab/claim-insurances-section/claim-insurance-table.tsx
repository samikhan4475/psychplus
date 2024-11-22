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

  const claimInsurancePolicies = form.watch('claimInsurancePolicies') || []
  const [editRowId, setEditRowId] = useState<number | null>(null)

  const columns = getColumns(editRowId, setEditRowId)

  const transformedInsurances = useMemo(() => {
    const primaryStatusCode = form.getValues('primaryStatusCode')
    const secondaryStatusCode = form.getValues('secondaryStatusCode')
    const tertiaryStatusCode = form.getValues('tertiaryStatusCode')

    return claimInsurancePolicies.map((insurance) => ({
      ...insurance,
      viewHcfa:
        (primaryStatusCode === 'NewCharge' &&
          insurance.insurancePolicyPriority === 'Primary') ||
        (secondaryStatusCode === 'NewCharge' &&
          insurance.insurancePolicyPriority === 'Secondary') ||
        (tertiaryStatusCode === 'NewCharge' &&
          insurance.insurancePolicyPriority === 'Tertiary'),
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
