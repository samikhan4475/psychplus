'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const StatusField = () => {
  const form = useFormContext<AddMedicationSchemaType>()

  return (
    <Flex direction="column" className="flex-1">
      <BlockLabel name="allergyType" required>Status</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        onChange={(values) => form.setValue('status', values)}
        defaultValues={form.watch('status')}
        className="w-full"
      />
    </Flex>
  )
}

export { StatusField }
