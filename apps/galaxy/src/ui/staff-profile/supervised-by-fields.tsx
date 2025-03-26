import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'
import { Credentials } from './types'

const SupervisedByField = () => {
  const form = useFormContext<SchemaType>()
  const credentials = form.watch('title')
  const isEnabled = credentials
    ? !Object.values(Credentials).includes(credentials as Credentials)
    : false

  if (isEnabled) form.setValue('supervisedBy', '')

  return (
    <FormFieldContainer>
      <FormFieldLabel>Supervised by</FormFieldLabel>
      <TextField.Root
        size="1"
        disabled={isEnabled}
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('supervisedBy')}
      />
    </FormFieldContainer>
  )
}

export { SupervisedByField }
