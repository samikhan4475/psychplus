'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, MultiSelectField } from '@/components'
import { AGE_GROUP_OPTIONS } from '../../constants'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const Age = () => {
  const form = useFormContext<ProviderCodingSchema>()

  return (
    <Flex className="flex-1" direction="column" gap="1">
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
      <FormFieldError name="age" />
    </Flex>
  )
}

export { Age }
