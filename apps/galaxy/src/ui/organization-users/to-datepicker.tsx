'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDatepicker = () => {
  return (
    <FormFieldContainer className="flex-1 flex-row gap-2">
      <FormFieldLabel className='text-pp-icon-sub'>To</FormFieldLabel>
      <DatePickerInput field="to"  className='min-w-[110px]'/>
    </FormFieldContainer>
  )
}

export { ToDatepicker }
