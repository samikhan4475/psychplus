'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { useDropdownContext } from '../../context'
import { FormFieldContainer } from '../../shared'

const StateSelect = () => {
  const { usStates } = useDropdownContext()

  const options = usStates.map((v) => ({
    label: v.stateName,
    value: v.id,
  }))

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">State</FormFieldLabel>
      <SelectInput
        field="state"
        placeholder="Select"
        options={options}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }