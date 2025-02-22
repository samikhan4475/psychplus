'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const VisitTypeSelect = () => {
  const option = useCodesetOptions(CODESETS.VisitType)

  return (
    <FormFieldContainer className="flex-row">
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitType"
        options={transformInOptions(option)}
        size="1"
        buttonClassName="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
