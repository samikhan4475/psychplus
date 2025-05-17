import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { MEDICATIONSSTATUS } from './types'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        options={MEDICATIONSSTATUS}
        buttonClassName="w-full"
        className="h-full flex-1"
        field="notificationResponseType"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
