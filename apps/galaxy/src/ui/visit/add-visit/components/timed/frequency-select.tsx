'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from '../../schema'

const FrequencyDropdown = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.VisitRepeatFrequency)
  const duration = form.watch('duration')

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
        options={items}
        buttonClassName="flex-1"
        disabled={!duration}
      />
      <FormFieldError name="frequency" />
    </FormFieldContainer>
  )
}

export { FrequencyDropdown }
