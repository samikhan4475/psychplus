'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { AGE_GROUP_OPTIONS } from '../../constants'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const AgeInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
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
  )
}

export { AgeInput }
