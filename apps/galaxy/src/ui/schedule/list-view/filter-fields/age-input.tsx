'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, MultiSelectField } from '@/components'
import { AGE_GROUP_OPTIONS } from '../../constants'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const AgeInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <Flex className="flex-1" direction="column" gap="1">
      <FormFieldContainer>
        <FieldLabel>Age Group</FieldLabel>
        <MultiSelectField
          defaultValues={form.watch('age')}
          options={AGE_GROUP_OPTIONS}
          className="flex-1"
          onChange={(values) => {
            form.setValue('age', values, { shouldDirty: true })
          }}
          menuClassName="w-[155px]"
        />
      </FormFieldContainer>
      <FormFieldError name="age" />
    </Flex>
  )
}

export { AgeInput }
