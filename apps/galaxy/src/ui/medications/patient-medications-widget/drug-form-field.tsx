'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const DrugFormField = () => {
  const form = useFormContext<AddMedicationSchemaType>()

  return (
    <Flex direction="column" className="flex-1">
      <BlockLabel name="allergyType" required>Drug Form</BlockLabel>
      <MultiSelectField
        defaultValues={form.watch('drugForm')}
        options={OPTIONS}
        className="w-full"
        onChange={(values) => form.setValue('drugForm', values)}
      />
    </Flex>
  )
}

export { DrugFormField }
