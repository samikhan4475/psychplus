'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const CptCodeSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">CPT Codes</FormFieldLabel>
      <SelectInput
        field="cptCodes"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="cptCodes" />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Test',
    value: 'test',
  },
  {
    label: 'Primary',
    value: 'primary',
  },
]
export { CptCodeSelect }
