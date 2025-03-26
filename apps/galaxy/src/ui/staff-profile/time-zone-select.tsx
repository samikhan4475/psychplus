import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const TimeZoneSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Time Zone Preferences</FormFieldLabel>
      <CodesetSelect
        size="1"
        codeset={CODESETS.TimeZoneId}
        groupingCodes={['US']}
        name="timeZonePreference"
      />
      <FormFieldError name="timeZonePreference" />
    </FormFieldContainer>
  )
}

export { TimeZoneSelect }
