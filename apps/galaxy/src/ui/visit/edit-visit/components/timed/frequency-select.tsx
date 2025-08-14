'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const FrequencySelect = () => {
  const codes = useCodesetCodes(CODESETS.VisitRepeatFrequency)
  const items = codes.map((option) => {
    return { value: option.value, label: option.display }
  })

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Frequency</FormFieldLabel>
      <SelectInput
        field="frequency"
        buttonClassName="h-6 w-full"
        options={items}
      />
      <FormFieldError name="frequency" />
    </FormFieldContainer>
  )
}

export { FrequencySelect }
