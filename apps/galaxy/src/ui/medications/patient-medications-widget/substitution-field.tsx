'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const SubstitutionField = () => {
  const form = useFormContext<AddMedicationSchemaType>()

  return (
    <Flex direction="column" className="flex-1">
      <BlockLabel name="allergyType">Substitution</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        onChange={(values) => form.setValue('substitution', values)}
        defaultValues={form.watch('substitution')}
        className="w-full"
      />
    </Flex>
  )
}

export { SubstitutionField }
