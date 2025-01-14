'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { AddAllergySchemaType } from './add-allergy'
import { OPTIONS } from './constant'

const AllergyTypeField = () => {
  const form = useFormContext<AddAllergySchemaType>()
  return (
    <Flex direction="column" width="70%">
      <BlockLabel name="allergyType">Allergy Type</BlockLabel>
      <MultiSelectField
        defaultValues={form.watch('allergyType')}
        options={OPTIONS}
        onChange={(values) => form.setValue('allergyType', values)}
        className="w-full"
      />
    </Flex>
  )
}

export { AllergyTypeField }
