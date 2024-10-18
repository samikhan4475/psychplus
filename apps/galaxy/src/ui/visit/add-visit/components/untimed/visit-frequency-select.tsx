'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../../schema'

const VisitFrequencyDropdown = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.VisitRepeatFrequency)

  useEffect(() => {
    form.setValue('visitFrequency', 'Daily')
  }, [])

  const options = codes
    .filter((attr) =>
      attr.attributes?.find(
        (attr) => attr.name === 'Group' && attr.value === 'Untimed',
      ),
    )
    .map((option) => {
      return { label: option.display, value: option.value }
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
