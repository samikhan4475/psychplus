'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FormFieldContainer } from '../../shared'

const AgeInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Age</FormFieldLabel>
      <TextField.Root
        placeholder="Add Age"
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
