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

  // @TODO: Set default value based on the service when visit info is fetched

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
        options={options}
        field="visitFrequency"
        disabled
        buttonClassName="flex-1"
      />
      <FormFieldError name="visitFrequency" />
    </FormFieldContainer>
  )
}

export { VisitFrequencySelect }
