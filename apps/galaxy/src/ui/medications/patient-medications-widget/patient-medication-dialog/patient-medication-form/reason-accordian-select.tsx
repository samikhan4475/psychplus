'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const ReasonAccordianSelect = () => {
  const options = [
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'print', label: 'Print' },
  ]
  return (
    <FormFieldContainer className="flex-1 flex-row items-center gap-2">
      <FormFieldLabel className="!text-1 font-bold">Reason</FormFieldLabel>
      <SelectInput
        options={options}
        field=""
        buttonClassName="w-full h-7"
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { ReasonAccordianSelect }
