'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const StateSelect = () => {
  const options = useCodesetOptions(CODESETS.UsStates)

  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>State</FormFieldLabel>
      <SelectInput
        field="stateCode"
        options={transformInOptions(options)}
        size="1"
        buttonClassName="w-[120px] h-6"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
