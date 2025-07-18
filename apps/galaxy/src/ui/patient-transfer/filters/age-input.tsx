'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'


const AgeInput = () => {
  const form = useFormContext<PatientTransferSchemaType>()

  return (
    <Flex>
      <FormFieldContainer className="flex-row items-center gap-2">
        <FormFieldLabel>Age</FormFieldLabel>
        <TextField.Root
          placeholder="Age"
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
