'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const PrnReasonField = () => {
  const form = useFormContext<AddMedicationSchemaType>()

  return (
    <Flex direction="column" className="flex-1">
      <BlockLabel name="allergyType">Reason for PRN</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        onChange={(values) => form.setValue('prnReason', values)}
        defaultValues={form.watch('prnReason')}
        className="w-full"
      />
    </Flex>
  )
}

export { PrnReasonField }
