'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const DurationField = () => {
  const form = useFormContext<AddMedicationSchemaType>()

  return (
    <Flex direction="column" className="flex-1">
      <BlockLabel name="allergyType" required>Duration</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        className="w-full"
        onChange={(values) => form.setValue('duration', values)}
        defaultValues={form.watch('duration')}
      />
    </Flex>
  )
}

export { DurationField }
