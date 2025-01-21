'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const DurationUnitField = () => {
  const form = useFormContext<AddMedicationSchemaType>()

  return (
    <Flex direction="column" className="flex-1">
      <BlockLabel name="allergyType" required>Duration Unit</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        className="w-full"
        onChange={(values) => form.setValue('durationUnit', values)}
        defaultValues={form.watch('durationUnit')}
      />
    </Flex>
  )
}

export { DurationUnitField }
