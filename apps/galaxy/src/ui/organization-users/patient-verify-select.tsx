'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  SelectInput
} from '@/components'
import { OPTIONS } from './constants'

const PatientVerifySelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Patient Verify</FormFieldLabel>
      <SelectInput field="ptVerify" options={OPTIONS} buttonClassName='min-w-[115px]' />
    </FormFieldContainer>
  )
}
export { PatientVerifySelect }
