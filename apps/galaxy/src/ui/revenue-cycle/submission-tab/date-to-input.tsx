import React from 'react'
import { DatePickerInput, FormFieldContainer, FormFieldLabel } from '@/components'
const DateToInput = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>
        To
      </FormFieldLabel>
      <DatePickerInput className='w-[102px]' field="toDate" />
    </FormFieldContainer>
  )
}
export { DateToInput }
