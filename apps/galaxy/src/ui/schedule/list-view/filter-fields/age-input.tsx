'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const AgeInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Age</FieldLabel>
      <TextField.Root
        placeholder="Add Age"
        className='flex-1'
        size="1"
        type="number"
        {...form.register('age', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { AgeInput }
