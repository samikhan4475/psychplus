'use client'

import { AsyncSelect } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { getInsurancePlanPayersOptionsAction } from '../../actions'

const InsurancePayerNameSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Insurance Plan Name</FormFieldLabel>
      <AsyncSelect
        field="insurancePlanId"
        fetchOptions={getInsurancePlanPayersOptionsAction}
        buttonClassName="w-full"
      />
      <FormFieldError name="insurancePlanId" />
    </FormFieldContainer>
  )
}

export { InsurancePayerNameSelect }
