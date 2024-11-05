'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { generateTimeOptions } from '@/utils'

const TimeSelect = () => {
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1" required>
        Time
      </FormFieldLabel>
      <SelectInput
        size="1"
        field="chargeTime"
        options={generateTimeOptions()}
        placeholder="00.00"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="chargeTime" />
    </FormFieldContainer>
  )
}

export { TimeSelect }
