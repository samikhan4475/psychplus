'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { AddAllergySchemaType } from './add-allergy'
import { OPTIONS } from './constant'

const SeverityField = () => {
  const form = useFormContext<AddAllergySchemaType>()
  return (
    <Flex direction="column" width="30%">
      <BlockLabel name="Severity">Severity</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        defaultValues={form.watch('severity')}
        onChange={(values) => form.setValue('severity', values)}
        className="w-full"
      />
    </Flex>
  )
}

export { SeverityField }
