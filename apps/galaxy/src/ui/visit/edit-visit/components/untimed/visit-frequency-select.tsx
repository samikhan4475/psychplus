'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const VisitFrequencySelect = () => {
  const codes = useCodesetCodes(CODESETS.VisitRepeatFrequency)
  const options = codes
    .filter((attr) =>
      attr.attributes?.find(
        (attr) => attr.name === 'Group' && attr.value === 'Untimed',
      ),
    )
    .map((option) => {
      const value = option?.attributes?.find(
        (attr) => attr.name === 'ResourceId',
      )?.value as string
      return { value, label: option.display }
    })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Frequency</FormFieldLabel>
      <SelectInput
        options={options}
        field="visitFrequency"
        disabled
        buttonClassName="h-6 w-full"
      />
      <FormFieldError name="visitFrequency" />
    </FormFieldContainer>
  )
}

export { VisitFrequencySelect }
