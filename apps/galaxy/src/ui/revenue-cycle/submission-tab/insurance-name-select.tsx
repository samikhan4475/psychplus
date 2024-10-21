'use client'
import React from 'react'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getInsurancePayersOptionsAction } from '@/actions'

const InsuranceNameSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className='min-w-fit' >
        Insurance Name
      </FormFieldLabel>
      <AsyncSelect
        className='w-fit'
        field="insuranceId"
        fetchOptions={getInsurancePayersOptionsAction}
        buttonClassName="w-[102px]"

      />
    </FormFieldContainer>
  )
}
export { InsuranceNameSelect }
