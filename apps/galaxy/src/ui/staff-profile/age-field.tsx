import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'
import { getAgeFromDate } from '@/utils'

const AgeField = () => {
  const form = useFormContext<SchemaType>()
  const dob = form.watch('dob')
  const age = dob ? getAgeFromDate(dob) : 18

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
