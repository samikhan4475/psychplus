import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { getAgeFromDate } from '@/utils'
import { SchemaType } from './schema'

const AgeField = () => {
  const form = useFormContext<SchemaType>()
  const dob = form.watch('dateOfBirth')
  const age = dob ? getAgeFromDate(dob) : ''

  return (
    <FormFieldContainer>
      <FormFieldLabel>Age</FormFieldLabel>
      <TextField.Root
        size="1"
        disabled
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        value={age}
      />
    </FormFieldContainer>
  )
}

export { AgeField }
