'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { NEXT_OPTIONS } from '../constants'

const NextDropdown = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Next</FormFieldLabel>
      <SelectInput
        field="next"
        defaultValue="4week"
        placeholder="Select"
        options={NEXT_OPTIONS}
        buttonClassName="w-full h-6"
        className="w-[90px]"
      />
    </FormFieldContainer>
  )
}

export { NextDropdown }
