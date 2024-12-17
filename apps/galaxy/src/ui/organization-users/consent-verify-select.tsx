'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { OPTIONS } from './constants'

const ConsentVerifySelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-2">
      <FormFieldLabel className="!text-1">Consent Verify</FormFieldLabel>
      <DropdownSelect field="consentVerify" options={OPTIONS} className='min-w-[115px]'/>
    </FormFieldContainer>
  )
}
export { ConsentVerifySelect }
