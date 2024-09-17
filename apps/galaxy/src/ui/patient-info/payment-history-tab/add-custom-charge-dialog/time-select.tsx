'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const TimeSelect = () => {
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1">Time</FormFieldLabel>
      <SelectInput
        size="1"
        field="time"
        placeholder="00.00"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { TimeSelect }
