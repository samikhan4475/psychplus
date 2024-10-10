'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const DateOfBirthInput = () => {
  return (
    <FormFieldContainer className='flex-1'>
      <FormFieldLabel>DOB</FormFieldLabel>
      <DatePickerInput field="dateOfBirth" dateInputClass='h-6' />
    </FormFieldContainer>
  )
}

export { DateOfBirthInput }
