'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const PrioritySelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Priority
      </FormFieldLabel>

      <CodesetSelect
        name="insurancePolicyPriority"
        codeset={CODESETS.InsurancePolicyPriority}
        className="border-pp-gray-2 h-7 w-full border border-solid text-1 !outline-none [box-shadow:none]"
        size="1"
        placeholder="Select priority"
      />

      <FormFieldError name="insurancePolicyPriority" />
    </FormFieldContainer>
  )
}

export { PrioritySelect }
