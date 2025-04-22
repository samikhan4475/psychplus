'use client'

import React, { useMemo } from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const TimeZoneSelect = () => {
  const codes = useCodesetCodes(CODESETS.TimeZoneId)

  const options = useMemo(() => {
    return codes
      ?.filter(
        ({ groupingCode, attributes }) =>
          groupingCode === 'US' &&
          attributes?.find(
            ({ name, value }) => name === 'DEFAULT' && value === 'US',
          ),
      )
      .map(({ display, value }) => ({
        label: display,
        value: value,
      }))
  }, [codes])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Time Zone Preferences</FormFieldLabel>
      <SelectInput
        size="1"
        options={options}
        field="timeZonePreference"
        buttonClassName="h-6 w-full"
      />
      <FormFieldError name="timeZonePreference" />
    </FormFieldContainer>
  )
}

export { TimeZoneSelect }
