import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { AsyncSelect } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { Insurance } from '@/types'
import { getPatientPoliciesAction } from './actions'
import { SchemaType } from './schema'

interface PayerSelectProps {
  insurance?: Insurance
}
const PayerSelect = ({ insurance }: PayerSelectProps) => {
  const form = useFormContext<SchemaType>()
  const patientId = form.watch('patientId')
  const getPatientPolicies = useCallback(
    () => getPatientPoliciesAction(patientId),
    [patientId],
  )
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Plan</FormFieldLabel>
      <AsyncSelect
        field="patientInsurancePolicyId"
        buttonClassName="w-full text-1 h-6"
        required
        loading={!patientId}
        disabled={!!insurance?.id}
        fetchOptions={getPatientPolicies}
      />
      <FormFieldError name="patientInsurancePolicyId" />
    </FormFieldContainer>
  )
}

export { PayerSelect }
