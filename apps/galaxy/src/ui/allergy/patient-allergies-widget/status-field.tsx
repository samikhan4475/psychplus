'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { AddAllergySchemaType } from './add-allergy'
import { OPTIONS } from './constant'

const StatusField = () => {
  const form = useFormContext<AddAllergySchemaType>()

  return (
    <Flex direction="column" width="30%">
      <BlockLabel name="Status">Status</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        defaultValues={form.watch('status')}
        onChange={(values) => form.setValue('status', values)}
        className="w-full"
      />
    </Flex>
  )
}

export { StatusField }
