'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { OPTIONS } from './constants'

const InsuranceVerifySelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Insurance Verify</FormFieldLabel>
      <DropdownSelect field="inVerify" options={OPTIONS} className='min-w-[115px]'/>
    </FormFieldContainer>
  )
}
export { InsuranceVerifySelect }
