'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const PolicyTypeSelect = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Policy Type</FormFieldLabel>
      <SelectInput
        field="policyType"
        placeholder="Select"
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="policyType" />
    </FormFieldContainer>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-[144px] h-6 border border-solid !outline-none [box-shadow:none]'

export { PolicyTypeSelect }
