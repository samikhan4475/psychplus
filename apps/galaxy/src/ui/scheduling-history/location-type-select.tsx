'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const options = [
  {
    label: 'test1',
    value: 'test1',
  },
  {
    label: 'test2',
    value: 'test2',
  },
  {
    label: 'test3',
    value: 'test3',
  },
  {
    label: 'test4',
    value: 'test4',
  },
]

const LocationTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Loc. Type</FormFieldLabel>
      <SelectInput
        field="locationType"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[111px]'
export { LocationTypeSelect }
