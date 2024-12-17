'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { ToDatepicker } from './to-datepicker'
import { FromDatepicker } from './from-datepicker'

const UserCreationGroup = () => {
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">User Created</FormFieldLabel>
      <FromDatepicker />
      <ToDatepicker  />
    </FormFieldContainer>
  )
}

export { UserCreationGroup }
