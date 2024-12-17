'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  SelectInput
} from '@/components'
import { OPTIONS } from './constants'

const CreditCardVerifySelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Credit Card Verify</FormFieldLabel>
      <SelectInput field="ccVerify" options={OPTIONS} buttonClassName='min-w-[115px] h-6'/>
    </FormFieldContainer>
  )
}
export { CreditCardVerifySelect }
