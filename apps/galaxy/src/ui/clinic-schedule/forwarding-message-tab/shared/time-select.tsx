'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldError } from '@/components/form'
import { generateTimeIntervals } from '../utils'

interface TimeSelectProps {
  field: string
}
const TimeSelect = ({ field }: TimeSelectProps) => {
  return (
    <FormFieldContainer className="flex-1 gap-0 pt-0.5">
      <SelectInput
        field={field}
        options={generateTimeIntervals()}
        size="1"
        buttonClassName="border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-full"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { TimeSelect }
