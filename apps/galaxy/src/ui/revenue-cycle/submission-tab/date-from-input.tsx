import React from 'react'
import { DatePickerInput, FormFieldContainer, FormFieldLabel } from '@/components'
const DateFromInput = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className='min-w-fit' >
        From
      </FormFieldLabel>
      <DatePickerInput className='w-[102px]' field={'fromDate'} />
    </FormFieldContainer>
  )
}
export { DateFromInput }
