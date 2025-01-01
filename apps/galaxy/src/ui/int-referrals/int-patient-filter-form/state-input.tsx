'use client'

import { DropdownSelect } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const StateInput = () => {
  const options = useCodesetOptions(CODESETS.UsStates)
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>State</FormFieldLabel>

      <DropdownSelect
        field="stateOfResidenceCode"
        options={options}
        placeholder="Select State"
      />
    </FormFieldContainer>
  )
}

export { StateInput }
