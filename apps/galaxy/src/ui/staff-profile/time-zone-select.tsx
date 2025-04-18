'use client'
import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const TimeZoneSelect = () => {
  const codes = useCodesetOptions(CODESETS.TimeZoneId, undefined, undefined, ['US'])
  const options = codes?.map((code) => ({
    label: code?.value,
    value: code?.value
  }))
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Time Zone Preferences</FormFieldLabel>
      <SelectInput
        size="1"
        options={options}
        field="timeZonePreference"
        buttonClassName='h-6 w-full'
      />
      <FormFieldError name="timeZonePreference" />
    </FormFieldContainer>
  )
}

export { TimeZoneSelect }
