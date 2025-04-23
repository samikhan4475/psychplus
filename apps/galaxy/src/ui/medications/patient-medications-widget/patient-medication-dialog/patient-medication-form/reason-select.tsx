'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const ReasonSelect = () => {
  const options = [
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'print', label: 'Print' },
  ]
  return (
    <FormFieldContainer className="flex-1 flex-row items-center gap-2">
      <FormFieldLabel className="!text-1 font-bold">Reason</FormFieldLabel>
      <SelectInput options={options} field="" buttonClassName="w-[120px] h-7" />
    </FormFieldContainer>
  )
}

export { ReasonSelect }
