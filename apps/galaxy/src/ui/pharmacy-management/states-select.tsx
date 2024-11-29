'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const StateSelect = () => {
  const options = useCodesetOptions(CODESETS.UsStates)

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">State</FormFieldLabel>
      <SelectInput
        placeholder="Select"
        field="state"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={options}
        tooltip
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
