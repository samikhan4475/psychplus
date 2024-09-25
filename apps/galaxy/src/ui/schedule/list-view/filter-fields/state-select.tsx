'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { useDropdownContext } from '../../context'
import { FormFieldContainer } from '../../shared'

const StateSelect = () => {
  const { usStates } = useDropdownContext()
  const usStatesOptions = usStates.map(state => ({
    label: state.stateName,
    value: state.id,
  }))

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">State</FormFieldLabel>
      <SelectInput
        field="state"
        placeholder="Select"
        options={usStatesOptions}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
