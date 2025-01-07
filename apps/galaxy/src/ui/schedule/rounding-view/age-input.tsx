'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { BookedAppointmentsSchemaType } from '../schema'
import { FieldLabel, FormFieldContainer } from '../shared'

const AgeInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <Flex direction="column">
      <FormFieldContainer className="flex-1">
        <FieldLabel>Age</FieldLabel>
        <TextField.Root
          placeholder="Add Age"
          type="number"
          size="1"
          {...form.register('age', {
            setValueAs: (val) => val || undefined,
          })}
        />
      </FormFieldContainer>
      <FormFieldError name="age" />
    </Flex>
  )
}

export { AgeInput }
