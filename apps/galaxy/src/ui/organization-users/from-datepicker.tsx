'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDatepicker = () => {
  return (
    <FormFieldContainer className="flex-1 flex-row gap-2">
      <FormFieldLabel className='text-pp-icon-sub'>From</FormFieldLabel>
      <DatePickerInput field="patientCreatedFrom"  className='min-w-[110px]'/>
    </FormFieldContainer>
  )
}

export { FromDatepicker }
