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
    const value = option?.attributes?.find((attr) => attr.name === 'ResourceId')
      ?.value as string
    return { value: value, label: option.display }
  })

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Frequency</FormFieldLabel>
      <SelectInput
        field="frequency"
        buttonClassName="flex-1 w-full"
        options={items}
      />
      <FormFieldError name="frequency" />
    </FormFieldContainer>
  )
}

export { FrequencySelect }
