'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DOBField = () => {
  return (
    <FormFieldContainer className="max-w-44 flex-1 flex-row gap-2">
      <FormFieldLabel className="!text-1">DOB</FormFieldLabel>
      <DatePickerInput field="dateOfBirth" className='min-w-[142px]' />
    </FormFieldContainer>
  )
}

export { DOBField }
