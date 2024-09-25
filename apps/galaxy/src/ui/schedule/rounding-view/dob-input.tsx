'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../shared'

const DateOfBirthInput = () => {
  return (
    <FormFieldContainer className='flex-1'>
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput field="dob" />
    </FormFieldContainer>
  )
}

export { DateOfBirthInput }
