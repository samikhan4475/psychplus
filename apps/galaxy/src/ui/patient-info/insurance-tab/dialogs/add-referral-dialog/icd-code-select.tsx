'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const IcdCodeSelect = () => {
  return (
    <FormFieldContainer className="col-span-2 w-full">
      <FormFieldLabel className="!text-1">ICD Codes</FormFieldLabel>
      <SelectInput
        field="icdCodes"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="icdCodes" />
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
export { IcdCodeSelect }
