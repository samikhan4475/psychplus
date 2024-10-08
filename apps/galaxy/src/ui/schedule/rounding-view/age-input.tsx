'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'
import { BookedAppointmentsSchemaType } from '../schema'
import { FormFieldContainer } from '../shared'

const AgeInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <Flex direction="column">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Age</FormFieldLabel>
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
