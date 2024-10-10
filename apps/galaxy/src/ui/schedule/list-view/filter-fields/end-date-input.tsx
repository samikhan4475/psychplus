'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const EndDateInput = () => {
  return (
    <FormFieldContainer className='flex-1'>
      <FormFieldLabel>To</FormFieldLabel>
      <DatePickerInput field="endingDate" dateInputClass='h-6' />
    </FormFieldContainer>
  )
}

export { EndDateInput }
