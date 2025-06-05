import React, { useEffect, useState } from 'react'
import { Grid } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getReceiverListOptionsAction } from '@/actions'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SelectOptionType } from '@/types'

const dropdownOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]

const PracticeSettingsFields = () => {
  const [submissionTypes, setSubmissionTypes] = useState<SelectOptionType[]>([])

  useEffect(() => {
    ;(async () => {
      const result = await getReceiverListOptionsAction()
      if (result.state === 'error') {
        toast.error(result.error)
        return
      }

      setSubmissionTypes(result.data)
    })()
  }, [])
  return (
    <Grid columns="3" gapX="3">
      <FormFieldContainer>
        <FormFieldLabel required>Default Clearing House</FormFieldLabel>
        <DropdownSelect
          loading={submissionTypes.length === 0}
          options={submissionTypes}
          field="defaultClearinghouseReceiverId"
        />
        <FormFieldError name="defaultClearinghouseReceiverId" />
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel required>Auto Submission</FormFieldLabel>
        <DropdownSelect
          field="isAutoSubmissionEnabled"
          options={dropdownOptions}
        />
        <FormFieldError name="isAutoSubmissionEnabled" />
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel required>Auto Payment Posting</FormFieldLabel>
        <DropdownSelect
          field="isAutoPaymentPostingEnabled"
          options={dropdownOptions}
        />
        <FormFieldError name="isAutoPaymentPostingEnabled" />
      </FormFieldContainer>
    </Grid>
  )
}

export { PracticeSettingsFields }
