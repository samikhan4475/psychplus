import React, { useEffect, useMemo } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { Credentials } from '@/ui/staff-profile/types'
import { SchemaType } from './schema'

const SupervisedByField = () => {
  const form = useFormContext<SchemaType>()
  const credentials = form.watch('legalName.title')
  const supervisedBy = form.watch('supervisedBy')
  const isDisabled = useMemo(
    () => !Object.values(Credentials).includes(credentials as Credentials),
    [credentials],
  )
  useEffect(() => {
    if (isDisabled && supervisedBy) {
      form.setValue('supervisedBy', '')
    }
  }, [isDisabled, supervisedBy])
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Supervised By</FormFieldLabel>
      <TextField.Root
        size="1"
        disabled={isDisabled}
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('supervisedBy')}
      />
      <FormFieldError name="supervisedBy" />
    </FormFieldContainer>
  )
}

export { SupervisedByField }
