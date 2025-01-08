'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const AgeInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <Flex className="flex-1" direction="column" gap="1">
      <FormFieldContainer>
        <FieldLabel>Age</FieldLabel>
        <TextField.Root
          placeholder="Add Age"
          className="flex-1"
          size="1"
          type="number"
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
