'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const VisitFrequencyDropdown = () => {
  const codes = useCodesetCodes(CODESETS.VisitRepeatFrequency)
  const options = codes
    .filter((attr) =>
      attr.attributes?.find(
        (attr) => attr.name === 'Group' && attr.value === 'Untimed',
      ),
    )
    .map((option) => {
      return { value: option.value, label: option.display }
    })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Frequency</FormFieldLabel>
      <SelectInput
        field="visitFrequency"
        options={options}
        buttonClassName="h-6 w-full"
        disabled
      />
      <FormFieldError name="visitFrequency" />
    </FormFieldContainer>
  )
}

export { VisitFrequencyDropdown }
